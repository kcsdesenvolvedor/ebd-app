const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: require.resolve('path-browserify'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ]);
  return config;
};