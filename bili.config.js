import { Config } from "bili";
import pkg from './package.json'

const config = {
  banner: true,
  bundleNodeModules: false,
  input: "src/index.js",
  output: {
    fileName: `${pkg.name}[min].js`,
    format: ["umd", "umd-min"],
    moduleName: pkg.name,
    target: "browser",
  },
  plugins: {
    babel: true
  }
};

module.exports = config;
