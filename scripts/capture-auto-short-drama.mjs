import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'images', 'projects');
const workspace = path.resolve(root, '..');
const toolkitPkg = path.join(workspace, 'prototype-demo-toolkit', 'package.json');
const projectDir = path.join(workspace, 'AIGC工作流辅助', 'auto-short-drama', 'frontend');

const require = createRequire(toolkitPkg);
const { chromium } = require('@playwright/test');

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
  const child = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'ignore',
    detached: true,
  });
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
  const port = 4173;
  const base = `http://127.0.0.1:${port}`;

  await mkdir(outDir, { recursive: true });
  startProcess(projectDir, 'npm', ['run', 'dev']);
  await waitForUrl(`${base}/`);

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const desktop = { width: 1280, height: 800 };

    await screenshot(page, 'auto-short-drama-cover.png', {
      ...desktop,
      url: `${base}/`,
      waitMs: 3000,
    });
    await screenshot(page, 'auto-short-drama-screenshot-ui.png', {
      ...desktop,
      url: `${base}/settings`,
      waitMs: 2000,
    });
    await page.close();
    console.log('Done. Output:', outDir);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
