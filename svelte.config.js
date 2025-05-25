import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    typescript: {
      config: (cfg) => {
        // remove the old TS-5 flags if present
        delete cfg.compilerOptions.importsNotUsedAsValues;
        delete cfg.compilerOptions.preserveValueImports;
        // add the new one
        cfg.compilerOptions.verbatimModuleSyntax = true;
        return cfg;
      }
    }
  }
  };

export default config;
