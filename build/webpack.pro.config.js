const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const chalk = require('chalk');
const fs = require('fs-extra');
const paths = require('./paths');

// fs.emptyDirSync(paths.appBuildDist);
module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new ProgressBarPlugin({
      format:
        `${chalk.green.bold("build[:bar]")} ` +
        chalk.green.bold(":percent") +
        " (:elapsed seconds)",
      clear: false,
      width: 60,
    }),
    // 压缩代码gzip工具
    new CompressionPlugin({
      deleteOriginalAssets: false,
      test: /\.js$|\.css$|\.jsx$|\.less$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ]
}