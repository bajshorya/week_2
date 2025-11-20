import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const cssConfig = {
  input: "src/styles/formyx.css",
  output: {
    file: "dist/formyx.css",
  },
  plugins: [
    postcss({
      minimize: true,
      extract: true,
    }),
  ],
};

const allStylesConfig = {
  input: "src/styles/index.css",
  output: {
    file: "dist/all.css",
  },
  plugins: [
    postcss({
      minimize: true,
      extract: true,
    }),
  ],
};

const mainConfig = {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/esm/index.esm.js",
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: ["**/*.css"],
      declaration: false,
      declarationMap: false,
    }),
    postcss({
      minimize: true,
      extensions: [".css"],
      inject: false,
      extract: false,
    }),
  ],
  external: ["react", "react-dom"],
};

const typesConfig = {
  input: "src/types-entry.ts",
  output: {
    file: "dist/index.d.ts",
    format: "esm",
  },
  plugins: [
    dts({
      tsconfig: "./tsconfig.json",
    }),
  ],
  external: ["react", "react-dom", "*.css"],
};

export default [cssConfig, allStylesConfig, mainConfig, typesConfig];
