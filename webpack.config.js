const path = require('path');

module.exports = {
  mode: 'development',
  // 多入口，多路径多文件输出的方式
  entry: {
    'app': './app.ts',
    'pages/page-entry/index': './index.ts',
    'pages/page-second/index': './index2.ts',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // 这个要设置下全局对象！ 不然跑不起来
    globalObject: 'tt',
    asyncChunks: false,
  },
  // 通过这个配置将公共依赖抽出，称为dist目录下的vendors.js依赖文件
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial"
        }
      }
    },
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ]
  },
  // 设置这个devtool，webpack产物中就没有evel了
  devtool: "source-map"
};
