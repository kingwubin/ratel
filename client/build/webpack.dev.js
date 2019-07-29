const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devServer: {
    open: true,
    port: 8001,
    hotOnly: true,
    overlay: true,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|webp|svg|gif|png|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
};

module.exports = merge(commonConfig, devConfig);
