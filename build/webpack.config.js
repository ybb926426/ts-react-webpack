const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');

module.exports = (env, argv) => {
  const config = argv.mode === 'development' ? devConfig : proConfig;
  return merge(commonConfig(argv.mode), config)
}
