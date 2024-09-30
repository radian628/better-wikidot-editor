import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";

const ctx = await esbuild.context({
  entryPoints: ["src/index.tsx", "src/multisave/index.tsx"],
  bundle: true,
  outdir: "build",
  plugins: [lessLoader()],
  minify: false,
});

await ctx.watch();
