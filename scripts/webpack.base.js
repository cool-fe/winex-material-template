const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

// resolve
exports.resolve = {
  extensions: [".js", ".vue", ".json"],
  alias: {
    // "@": path.resolve(__dirname, "../../src"),
    // packages: path.resolve(__dirname, "../../packages")
  }
};

// externals
exports.externals = {
  vue: {
    root: "Vue",
    commonjs: "vue",
    commonjs2: "vue",
    amd: "vue"
  }
};

// rules
exports.rules = [
  {
    test: /\.(js|jsx?|babel|es6)$/,
    include: process.cwd(),
    exclude: /node_modules/,
    loader: "babel-loader"
  },
  {
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  },
  {
    test: /\.(scss|css)$/,
    loaders: ["style-loader", "css-loader", "sass-loader"]
  },
  {
    test: /\.html$/,
    loader: "html-loader?minimize=false"
  },
  {
    test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
    loader: "url-loader",
    query: {
      esModule: false,
      limit: 10000,
      name: path.posix.join("static", "[name].[hash:7].[ext]")
    }
  },
  {
    test: /\.json$/,
    loader: "json-loader"
  }
];

//plugins
exports.plugins = [new ProgressBarPlugin(), new VueLoaderPlugin()];

// optimization
exports.optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        output: {
          comments: false
        }
      }
    })
  ]
};
