const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: `development`,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    port: 1337
  },
  devtool: 'source-map',
});
