const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  output: {
    filename: "[name].[contenthash].js", // Sử dụng băm nội dung
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "module", // Sử dụng mô-đun ES
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], 
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Bỏ dry:true để thực sự xóa file cũ
      verbose: true, 
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new WorkboxPlugin.GenerateSW({
      // Định nghĩa chiến lược caching ở đây
      // Ví dụ:
      // runtimeCaching: [
      //   {
      //     urlPattern: /\.(?:js|css)$/,
      //     handler: 'StaleWhileRevalidate',
      //   },
      //    ... các chiến lược khác
      // ],
    }),
  ],
};
