const path = require('path');

module.exports = {
  entry: './solve.js',
  output: {
    filename: 'gauss_seidel_solver.js',
    path: path.resolve(__dirname, 'release'),
    library : "react"
  },
};
