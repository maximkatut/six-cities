const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js(x)&/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
}
