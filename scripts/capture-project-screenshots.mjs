import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'images', 'projects');
const workspace = path.resolve(root, '..');

const require = createRequire(
  path.join(workspace, 'AI项目与简历整理', 'AI健身', 'AI健身app', 'aifit-mobile-app', 'package.json'),
);
const { chromium } = require('@playwright/test');

const aifitDir = path.join(workspace, 'AI项目与简历整理', 'AI健身', 'AI健身app', 'aifit-mobile-app');
const liangDir = path.join(workspace, 'AI项目与简历整理', 'AI面相识别与卦算 两相知', 'liangxiangzhi-prototype-main');
const shikiDir = path.join(workspace, '桌宠开发-shiki');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForUrl(url, timeoutMs = 60000) {
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

function startProcess(cwd, command, args, env = {}) {
  const child = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'ignore',
    detached: true,
    env: { ...process.env, ...env },
  });
  child.unref();
  return child;
}

function startHttpServer(cwd, port) {
  // npx serve avoids Windows python http.server issues with non-ASCII paths
  return startProcess(cwd, 'npx', ['--yes', 'serve', '-l', String(port), '--no-port-switching']);
}

async function screenshot(page, file, viewport) {
  if (viewport) await page.setViewportSize(viewport);
  await page.goto(viewport.url, { waitUntil: 'networkidle', timeout: 90000 });
  await sleep(viewport.waitMs ?? 1500);
  await page.screenshot({ path: path.join(outDir, file), fullPage: viewport.fullPage ?? false });
}

async function captureAifit(browser) {
  const port = 5180;
  const base = `http://127.0.0.1:${port}`;
  startProcess(aifitDir, 'npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort']);
  await waitForUrl(`${base}/`);

  const page = await browser.newPage();
  const mobile = { width: 390, height: 844 };

  await screenshot(page, 'aifit-screenshot-welcome.png', { ...mobile, url: `${base}/`, waitMs: 2000 });
  await screenshot(page, 'aifit-cover.png', { ...mobile, url: `${base}/app/home`, waitMs: 2000 });
  await screenshot(page, 'aifit-screenshot-training.png', { ...mobile, url: `${base}/app/training`, waitMs: 2000 });
  await page.close();
}

async function captureLiangxiangzhi(browser) {
  const port = 8765;
  const base = `http://127.0.0.1:${port}`;
  startHttpServer(liangDir, port);
  await waitForUrl(`${base}/prototype/index.html`);

  const page = await browser.newPage();
  const desktop = { width: 390, height: 844 };

  await screenshot(page, 'liangxiangzhi-cover.png', {
    ...desktop,
    url: `${base}/prototype/index.html`,
    waitMs: 3000,
  });
  await screenshot(page, 'liangxiangzhi-screenshot-intro.png', {
    ...desktop,
    url: `${base}/prototype/index.html`,
    waitMs: 3000,
  });
  await page.close();
}

async function captureShiki(browser) {
  const port = 5181;
  const base = `http://127.0.0.1:${port}`;
  startProcess(shikiDir, 'npm', ['run', 'dev:web', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort']);
  await waitForUrl(`${base}/`);

  const page = await browser.newPage();
  const desktop = { width: 1280, height: 800, fullPage: true };

  await screenshot(page, 'shiki-screenshot-ui.png', { ...desktop, url: `${base}/`, waitMs: 2500 });
  await screenshot(page, 'shiki-cover.png', { ...desktop, url: `${base}/`, waitMs: 2500 });
  await page.close();
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  try {
    console.log('Capturing AIFIT...');
    await captureAifit(browser);
    console.log('Capturing Liangxiangzhi...');
    await captureLiangxiangzhi(browser);
    console.log('Capturing Shiki...');
    await captureShiki(browser);
    console.log('Done. Output:', outDir);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
