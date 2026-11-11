import { defineConfig } from 'astro/config';
// Real domain. While PREVIEW=1 every page carries noindex and robots.txt blocks crawlers.
export default defineConfig({
  site: 'https://leedshomeguide.co.uk',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
});
