import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { recordDemo, toolkitRoot } from './lib/demo-runner.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {{ slug?: string; urlOverride?: string }} */
  const result = {};
  const positional = [];

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--url' && argv[i + 1]) {
      result.urlOverride = argv[++i];
    } else if (!argv[i].startsWith('-')) {
      positional.push(argv[i]);
    }
  }

  result.slug = positional[0];
  return result;
}

async function main() {
  const { slug, urlOverride } = parseArgs(process.argv.slice(2));

  if (!slug) {
    console.error('Usage: npm run demo:record -- <slug> [--url https://...]');
    console.error('Manifests: demo-manifests/<slug>.yaml');
    process.exit(1);
  }

  const manifestPath = path.join(toolkitRoot, 'demo-manifests', `${slug}.yaml`);
  const raw = await readFile(manifestPath, 'utf8');
  const manifest = parse(raw);

  if (!manifest || typeof manifest !== 'object') {
    throw new Error(`Invalid manifest: ${manifestPath}`);
  }

  const out = await recordDemo(manifest, { urlOverride });
  console.log('Done:', out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
