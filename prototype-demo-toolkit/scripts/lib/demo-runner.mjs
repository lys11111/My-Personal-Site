import { spawn } from 'node:child_process';
import { mkdir, readdir, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** @type {string} toolkit 根目录 */
export const toolkitRoot = path.resolve(__dirname, '../..');

/**
 * @param {number} ms
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {string} url
 * @param {number} [timeoutMs]
 */
export async function waitForUrl(url, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await sleep(500);
  }
  throw new Error(`Timeout waiting for ${url}`);
}

/**
 * @param {string} cwd
 * @param {string} command
 * @param {string[]} args
 */
export function startDetachedProcess(cwd, command, args) {
  const child = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'ignore',
    detached: true,
  });
  child.unref();
  return child;
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} baseUrl
 * @param {Record<string, unknown>} step
 */
export async function runStep(page, baseUrl, step) {
  const action = /** @type {string} */ (step.action);

  switch (action) {
    case 'goto': {
      const url = step.url.startsWith('http')
        ? step.url
        : new URL(step.url, baseUrl).toString();
      await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
      break;
    }
    case 'wait':
      await sleep(/** @type {number} */ (step.ms ?? 1000));
      break;
    case 'click':
      await page.locator(/** @type {string} */ (step.selector)).first().click({
        timeout: /** @type {number} */ (step.timeout ?? 15000),
      });
      break;
    case 'fill':
      await page.locator(/** @type {string} */ (step.selector)).first().fill(
        /** @type {string} */ (step.value ?? ''),
      );
      break;
    case 'press':
      await page.keyboard.press(/** @type {string} */ (step.key));
      break;
    case 'screenshot':
      await page.screenshot({
        path: /** @type {string} */ (step.path),
        fullPage: /** @type {boolean} */ (step.fullPage ?? false),
      });
      break;
    default:
      throw new Error(`Unknown step action: ${action}`);
  }
}

/**
 * @param {string} url
 * @returns {string}
 */
function toOrigin(url) {
  return new URL(url).origin;
}

/**
 * @param {Record<string, unknown>} startup
 * @param {string} toolkitDir
 * @returns {Promise<string>} baseUrl（仅 origin，供相对 path 拼接）
 */
export async function resolveBaseUrl(startup, toolkitDir) {
  const type = /** @type {string} */ (startup.type);

  if (type === 'url-only') {
    const base = /** @type {string} */ (startup.baseUrl);
    return base.endsWith('/') ? base.slice(0, -1) : base;
  }

  const cwd = path.resolve(toolkitDir, /** @type {string} */ (startup.cwd));
  const readyUrl = /** @type {string} */ (startup.readyUrl);

  if (type === 'npm-dev') {
    const command = /** @type {string} */ (startup.command ?? 'npm');
    const args = /** @type {string[]} */ (startup.args ?? ['run', 'dev']);
    startDetachedProcess(cwd, command, args);
    await waitForUrl(readyUrl);
    return toOrigin(readyUrl);
  }

  if (type === 'static-serve') {
    const port = /** @type {number} */ (startup.port ?? 8765);
    startDetachedProcess(cwd, 'npx', [
      '--yes',
      'serve',
      '-l',
      String(port),
      '--no-port-switching',
    ]);
    await waitForUrl(readyUrl);
    return toOrigin(readyUrl);
  }

  throw new Error(`Unknown startup.type: ${type}`);
}

/**
 * @param {string} rawDir
 * @param {string} outPath
 */
async function findLatestWebm(rawDir) {
  const files = await readdir(rawDir);
  const webms = files.filter((f) => f.endsWith('.webm'));
  if (webms.length === 0) {
    throw new Error(`No .webm found in ${rawDir}`);
  }
  webms.sort();
  return path.join(rawDir, webms[webms.length - 1]);
}

/**
 * @returns {Promise<string>}
 */
async function resolveFfmpegBinary() {
  try {
    const mod = await import('ffmpeg-static');
    const bin = mod.default;
    if (bin && typeof bin === 'string') return bin;
  } catch {
    /* use PATH */
  }
  return 'ffmpeg';
}

/**
 * @param {string} webmPath
 * @param {string} mp4Path
 */
export async function convertWebmToMp4(webmPath, mp4Path) {
  const { spawn: spawnProc } = await import('node:child_process');
  const ffmpegBin = await resolveFfmpegBinary();
  const args = [
    '-y',
    '-i',
    webmPath,
    '-c:v',
    'libx264',
    '-preset',
    'fast',
    '-crf',
    '28',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    mp4Path,
  ];
  await new Promise((resolve, reject) => {
    const ff = spawnProc(ffmpegBin, args, { stdio: 'inherit', shell: false, windowsHide: true });
    ff.on('close', (code) => (code === 0 ? resolve(undefined) : reject(new Error(`ffmpeg exit ${code}`))));
    ff.on('error', reject);
  });
}

/**
 * @param {import('yaml').Document.Parsed} manifest
 * @param {{ urlOverride?: string }} [opts]
 */
export async function recordDemo(manifest, opts = {}) {
  const slug = /** @type {string} */ (manifest.slug);
  const viewport = /** @type {{ width: number; height: number }} */ (manifest.viewport ?? {
    width: 390,
    height: 844,
  });
  const startup = /** @type {Record<string, unknown>} */ ({ ...manifest.startup });
  const steps = /** @type {Record<string, unknown>[]} */ (manifest.steps ?? []);
  const output = /** @type {Record<string, string>} */ (manifest.output ?? {});
  const videoName = output.video ?? `${slug}-demo.mp4`;

  if (opts.urlOverride && startup.type !== 'url-only') {
    startup.type = 'url-only';
    startup.baseUrl = opts.urlOverride;
  }

  const outDir = path.join(toolkitRoot, 'output', 'demos');
  const rawDir = path.join(outDir, '_raw', slug);
  await mkdir(rawDir, { recursive: true });
  await mkdir(outDir, { recursive: true });

  const baseUrl = await resolveBaseUrl(startup, toolkitRoot);
  console.log(`[${slug}] baseUrl: ${baseUrl}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    recordVideo: {
      dir: rawDir,
      size: { width: viewport.width, height: viewport.height },
    },
  });
  const page = await context.newPage();

  try {
    for (const step of steps) {
      console.log(`[${slug}] step: ${step.action}`);
      await runStep(page, `${baseUrl}/`, step);
    }
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }

  const webmPath = await findLatestWebm(rawDir);
  const mp4Path = path.join(outDir, videoName);
  try {
    await convertWebmToMp4(webmPath, mp4Path);
    await unlink(webmPath).catch(() => {});
    console.log(`[${slug}] saved: ${mp4Path}`);
    return mp4Path;
  } catch (err) {
    const fallback = path.join(outDir, videoName.replace(/\.mp4$/, '.webm'));
    await rename(webmPath, fallback);
    console.warn(`[${slug}] ffmpeg failed, kept WebM: ${fallback}`);
    console.warn(err);
    return fallback;
  }
}
