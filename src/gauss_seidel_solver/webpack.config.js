const path = require('path');

module.exports = {
  entry: './solve.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
