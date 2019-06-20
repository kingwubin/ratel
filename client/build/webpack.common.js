const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 在静态html上面增加一些静态资源
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
    filename: 'index.html',
  }),
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file), // 增加dll.js文件
    }));
  }
  // 当我们去打包index.js时候，会引入一些第三方模块，查到引入的第三方模块的时候，
  // 会去到manifest.json去找映射关系，如果能找到映射关系，第三方模块就没必要打包进来了，
  // 直接去dll.js拿过来用就可以了，会在全局变量里面拿。
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file),
    }));
  }
});

const commonConfig = {
  target: 'web',
  entry: {
    // viewport: path.resolve(__dirname, '../src/viewport.js'),
    main: path.resolve(__dirname, '../src/index.jsx'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        use: ['babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              fix: true,
            },
          }],
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: ['awesome-typescript-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, '../src'),
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: '/fonts',
          },
        },
        ],
      },
    ],
  },
  plugins,
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all', // all/async:只对异步代码有效果(对同步代码不进行代码分割)/initial:只对同步代码进行分割
      minSize: 3000, // 引入库大于3k才进行代码分割
      maxSize: 500000, // 如果一个库是1mb，maxSize配置为500k,就会把库分割为2个(如果能分割)，一般不需要进行配置。
      minChunks: 1, // 这个模块被用了多少次才进行代码分割
      maxAsyncRequests: 5, // 当代码分割到5个时候，后面的代码就不会进行代码分割
      maxInitialRequests: 3, //  首页在加载的时候(或者入口文件被加载时候)，入口文件在代码分割，最多只有2个
      automaticNameDelimiter: '~', // 文件生成的连接符
      name: true, // 为true时候，cacheGroups里面起的名字有效
      cacheGroups: { // chunks设置为all，并在这里进行配置，才能实现同步代码的分割
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 包是在vendors引入的，检测是否在node_module目录下面，把代码打包到vendors组里面
          priority: -10, // 优先级的设定，越大优先级越高（所有的内容都满足default，因为没有test判断）
          filename: 'js/vendors.js',
        },
        default: { // 当引入的同步模块(包括自己写的模块引入的时候)，不是在node_module目录下面时候，走到这个规则
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 在循环引用的时候，发现某一个模块已经被打包过了，就不会再进行打包了。
          filename: 'common.js',
        },
      },
    },
    // 还需要在package.json里面的"sideEffects": ["*.css"],进行配置，(模式是production，不需要进行配置，
    // 但是package.json里面需要进行配置)有些没有直接使用，
    // 但是需要引用的内容，如果设置为false，就是所有的都使用treeShaking
    usedExports: true,
  },
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
};

module.exports = commonConfig;
