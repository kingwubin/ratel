const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./webpack.common');

const proConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|wep|svg|gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name][hash].[ext]',
              outputPath: './images/',
              publicPath: '../images',
              limit: 100,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash].css',
      chunkFilename: './css/[name].chunk.css',
    }),
  ],
  output: {
    filename: 'js/[name].[hash].js', // main.js打包之后的文件
    chunkFilename: 'js/[name].[hash].js', // 间接引用的文件的文件名
  },
};

module.exports = merge(commonConfig, proConfig);
