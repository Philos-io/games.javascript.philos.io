module.exports = {
  entry: './src/app.tsx',
  output: {
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devServer: {
    contentBase: './src/static'
  }
}
