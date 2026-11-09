import { mkdir, mkdtemp, readFile, rm, rmdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, type Plugin, type ResolvedConfig } from 'vite';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function prerenderLocales(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'prerender-locales',
    apply: 'build',
    configResolved(resolved) {
      config = resolved;
    },
    async writeBundle({ dir }) {
      if (!dir) return;
      const template = await readFile(join(dir, 'index.html'), 'utf8');
      const temporary = await mkdtemp(join(config.root, 'node_modules', '.cv-prerender-'));
      const entry = join(temporary, 'render.mjs');

      try {
        await build({
          configFile: false,
          root: config.root,
          base: config.base,
          mode: config.mode,
          logLevel: 'warn',
          build: {
            ssr: 'src/prerender.tsx',
            outDir: temporary,
            copyPublicDir: false,
            rollupOptions: {
              output: { entryFileNames: 'render.mjs', inlineDynamicImports: true },
            },
          },
        });
        const { localeCodes, renderPage }: typeof import('../src/prerender') = await import(
          pathToFileURL(entry).href
        );
        for (const locale of localeCodes) {
          const { title, description, markup } = renderPage(locale);
          const html = template
            .replace('<html lang="en">', `<html lang="${locale}">`)
            .replace('<title></title>', () => `<title>${escapeHtml(title)}</title>`)
            .replace(
              'name="description" content=""',
              () => `name="description" content="${escapeHtml(description)}"`,
            )
            .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
          const directory = join(dir, locale);
          await mkdir(directory, { recursive: true });
          await writeFile(join(directory, 'index.html'), html);
        }
      } finally {
        await rm(entry, { force: true });
        await rmdir(temporary);
      }
    },
  };
}
