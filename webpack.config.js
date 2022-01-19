const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  // 多入口，多路径多文件输出的方式
  entry: {
    'app': './build/app.ts',
    'pages/page-entry/index': './build/page-entry.ts',
    'pages/page-second/index': './build/page-second.ts',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // 这个要设置下全局对象！ 不然跑不起来
    globalObject: 'tt',
    asyncChunks: false,
  },
  // 通过这个配置将公共依赖抽出，做为dist目录下的vendors.js依赖文件
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    // 测试生成runtime可以保证每个页面和app.js都共享一个运行时，不会出现多个react实例
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].ttss",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './scripts/template/base.ttml'),
          to: path.resolve(__dirname, './dist/base.ttml'),
        },
        {
          from: path.resolve(__dirname, './scripts/template/page.ttml'),
          to: path.resolve(__dirname, './dist/pages/page-entry/index.ttml'),
        },
        {
          from: path.resolve(__dirname, './scripts/template/page.ttml'),
          to: path.resolve(__dirname, './dist/pages/page-second/index.ttml'),
        },
        {
          from: path.resolve(__dirname, './demo/project.config.json'),
          to: path.resolve(__dirname, './dist/project.config.json'),
        },
        {
          from: path.resolve(__dirname, './demo/app.config.json'),
          to: path.resolve(__dirname, './dist/app.json'),
        }
      ]
    })
  ],
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.css',
    ],
    alias: {
      '@/index': path.resolve(__dirname, 'src/index')
    }
  },
  devtool: "source-map"
};
