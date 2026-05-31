import { spawn } from 'node:child_process';
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

const liangDir = path.join(workspace, 'AI项目与简历整理', 'AI面相识别与卦算 两相知', 'liangxiangzhi-prototype-main');
const shikiDir = path.join(workspace, '桌宠开发-shiki');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForUrl(url, timeoutMs = 90000) {
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

function startProcess(cwd, command, args) {
  const child = spawn(command, args, { cwd, shell: true, stdio: 'ignore', detached: true });
  child.unref();
  return child;
}

async function screenshot(page, file, opts) {
  await page.setViewportSize({ width: opts.width, height: opts.height });
  await page.goto(opts.url, { waitUntil: 'networkidle', timeout: 90000 });
  await sleep(opts.waitMs ?? 2500);
  await page.screenshot({
    path: path.join(outDir, file),
    fullPage: opts.fullPage ?? false,
  });
}

async function main() {
  const browser = await chromium.launch();
  try {
    const portL = 8766;
    startProcess(liangDir, 'npx', ['--yes', 'serve', '-l', String(portL), '--no-port-switching']);
    await waitForUrl(`http://127.0.0.1:${portL}/prototype/index.html`);
    const pageL = await browser.newPage();
    const mobile = { width: 390, height: 844 };
    await screenshot(pageL, 'liangxiangzhi-cover.png', {
      ...mobile,
      url: `http://127.0.0.1:${portL}/prototype/index.html`,
      waitMs: 3500,
    });
    await screenshot(pageL, 'liangxiangzhi-screenshot-intro.png', {
      ...mobile,
      url: `http://127.0.0.1:${portL}/prototype/index.html`,
      waitMs: 3500,
    });
    await pageL.close();

    const portS = 5182;
    startProcess(shikiDir, 'npm', ['run', 'dev:web', '--', '--host', '127.0.0.1', '--port', String(portS), '--strictPort']);
    await waitForUrl(`http://127.0.0.1:${portS}/`);
    const pageS = await browser.newPage();
    const desktop = { width: 1280, height: 800, fullPage: true };
    await screenshot(pageS, 'shiki-screenshot-ui.png', {
      ...desktop,
      url: `http://127.0.0.1:${portS}/`,
      waitMs: 3000,
    });
    await screenshot(pageS, 'shiki-cover.png', {
      ...desktop,
      url: `http://127.0.0.1:${portS}/`,
      waitMs: 3000,
    });
    await pageS.close();
    console.log('Captured liangxiangzhi + shiki');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
