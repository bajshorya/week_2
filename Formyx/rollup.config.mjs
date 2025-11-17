import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const mainConfig = {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/esm/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      declaration: false,
      declarationMap: false,
    }),
    postcss({
      extensions: [".css"],
      inject: true,
      extract: false,
    }),
  ],
  external: ["react", "react-dom"],
};

const typesConfig = {
  input: "src/index.tsx",
  output: {
    file: "dist/index.d.ts",
    format: "esm",
  },
  plugins: [
    dts({
      tsconfig: "./tsconfig.json",
    }),
  ],
  external: ["react", "react-dom"],
};

export default [mainConfig, typesConfig];
