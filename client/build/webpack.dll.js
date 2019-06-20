const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// 第三方模块只打包一次，后面再使用，不需要从node_module里面获取，只需要在dll两文件里面获取

module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]', // 打包生产的文件通过全局变量的方式暴露出来，在控制台可以看全部变量名
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dll')],
    }),
    new webpack.DllPlugin({
      name: '[name]',
      // 对这些第三方模块进行分析，把这个模块映射关系放到了manifest.json文件里面
      // 有了这个映射文件之后，结合全局变量，来对我们的源代码进行分析，一旦分析出来，我们
      // 我们使用的内容是在dll.js里面，就直接使用dll.js里面的内容，就不会去node_module里面引入模块了。
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
};
