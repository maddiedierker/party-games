const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// TODO: set up environment variables https://webpack.js.org/guides/environment-variables/
// TODO: set up production https://webpack.js.org/guides/production/

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
