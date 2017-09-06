const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './app/src/main.js',
    admin: './app/src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './build/js'),
    publicPath: '/build/js/',
    filename: '[name].js'

  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
}
