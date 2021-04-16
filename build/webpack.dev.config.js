const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
  devServer: {
    port: 8002,
    open: true,
    hot: true,
    // host: process.env.HOST || '0.0.0.0',
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.

    // publicPath: paths.publicUrlOrPath.slice(0, -1),
    // contentBase: paths.appPublic,
    static: {
      // contentBase: [path.resolve(__dirname, 'public')],
      // publicPath: [path.resolve(__dirname, 'public')]
      publicPath: paths.appPublic,
      // contentBase: paths.appPublic,
      watch: true,
      staticOptions: {
        contentBase: paths.appPublic,
      }
      // contentBasePublicPath: paths.publicUrlOrPath,
      // watchContentBase: true,
      // clientLogLevel: 'none',
    },
    historyApiFallback: true,

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new ESLintPlugin({
      fix: false, // 启用ESLint自动修复功能
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      context: paths.appSrc, // 文件根目录
      exclude: '/node_modules/',// 指定要排除的文件/目录
      cache: true, //缓存
      // ESLint class options
      cwd: paths.appPath,
    })
  ]
}
