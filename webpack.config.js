const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

/**
 * 【小程序类型配置】
 * 对应小程序类型的配置，默认是字节小程序，其他小程序如微信小程序，需修改配置：
 * const globalObject = 'wx'
 * const fileType = {
 *  templ: '.wxml',
 *  style: '.wxss',
 * }
 */

const globalObject = 'tt';
const fileType = {
  templ: '.ttml',
  style: '.ttss',
}

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
    // 对应小程序的全局对象，比如微信小程序是'wx'
    globalObject,
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
    // 生成runtime可以保证每个页面和app.js都共享一个运行时，不会出现多个react实例
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]${fileType.style}`,
    }),
    // 模拟Taro构建出小程序文件的过程
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './scripts/template/base.ttml'),
          to: path.resolve(__dirname, `./dist/base${fileType.templ}`),
        },
        {
          from: path.resolve(__dirname, './scripts/template/page.ttml'),
          to: path.resolve(__dirname, `./dist/pages/page-entry/index${fileType.templ}`),
        },
        {
          from: path.resolve(__dirname, './scripts/template/page.ttml'),
          to: path.resolve(__dirname, `./dist/pages/page-second/index${fileType.templ}`),
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
