import * as esbuild from 'esbuild'
// import { nodeExternalsPlugin } from 'esbuild-node-externals';

const config = {
    entryPoints: ['src/main.ts'],
    bundle: true,
    outdir: "build/electron",
    platform: "node",
    format: 'cjs',
    sourcemap: true,
    target: ['es2020'],
    loader: {
        '.ts': 'ts',
        '.js': 'js'
    },
    logLevel: 'info',
    external: ["electron"],
    plugins: [/*nodeExternalsPlugin()*/]
};

const shouldWatch = process.argv.includes('--watch') // Enable watch mode with --watch argument

if (shouldWatch) {
  async function watch() {
    let ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('Watching...');
  }
  watch();

} else {
  await esbuild.build(config);

}
