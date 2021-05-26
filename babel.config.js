module.exports = {
  presets: ["@babel/preset-env", "@vue/babel-preset-jsx"],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ],
  sourceType: "unambiguous"
};
