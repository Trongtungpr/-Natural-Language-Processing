const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  mode: "production",
  output: {
    libraryTarget: "var",
    library: "Client",
    path: path.resolve(__dirname, "dist"), // Chỉ định đường dẫn thư mục build
    filename: "[name].[contenthash].js", // Sử dụng contenthash
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[contenthash].[ext]", // Sử dụng contenthash cho file ảnh
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), // Sử dụng contenthash
    new WorkboxPlugin.GenerateSW({
      // Định nghĩa chiến lược caching cho Workbox
      // runtimeCaching: [
      //   {
      //     urlPattern: /\.(?:js|css)$/,
      //     handler: 'StaleWhileRevalidate',
      //   },
      //   ... các chiến lược khác
      // ],
    }),
    new CleanWebpackPlugin(), // Xóa thư mục dist trước khi build
  ],
};