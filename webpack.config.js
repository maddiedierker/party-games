const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// TODO: setup environment variables https://webpack.js.org/guides/environment-variables/
// TODO: setup production https://webpack.js.org/guides/production/

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "party games",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
