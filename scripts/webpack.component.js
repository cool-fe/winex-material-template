const path = require("path");
const config = require("./webpack.base.js");
const Components = require("../local/components.json");
module.exports = {
  mode: "production",
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), "./components"),
    filename: "[name]/lib/[name].js",
    chunkFilename: "[id].js",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: config.alias,
    modules: ["node_modules"]
  },
  externals: config.externals,
  optimization: config.optimization,
  module: {
    rules: config.rules
  },
  plugins: [...config.plugins]
};
