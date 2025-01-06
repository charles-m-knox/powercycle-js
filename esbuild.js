import { build } from 'esbuild';

await build({
  entryPoints: ['src/ui/components/powercycle/powercycle.ts'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  // target: "firefox60", // Since GJS 1.53.90
  // target: "firefox68", // Since GJS 1.63.90
  // target: "firefox78", // Since GJS 1.65.90
  // target: "firefox91", // Since GJS 1.71.1
  // target: "firefox102", // Since GJS 1.73.2
  target: 'firefox115', // Since GJS 1.77.2
  format: 'esm',
  external: ['gi://*', 'resource://*', 'gettext', 'system', 'cairo'],
  loader: {
    '.css': 'text',
    '.ui': 'text',
  },
  tsconfig: 'tsconfig.json',
});

await build({
  entryPoints: ['src/ant/ant.ts'],
  target: 'node20',
  platform: 'node',
  // outdir: 'dist-ant',
  outfile: 'dist-ant/ant.cjs',
  bundle: true,
  tsconfig: 'tsconfig.ant.json',
  packages: 'external',
});
