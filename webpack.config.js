const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const OptimizeJsPlugin = require('optimize-js-plugin')

const env = process.env.NODE_ENV || 'undefined';
const nmdir = path.resolve(__dirname, 'node_modules');

module.exports = {
  // resolve: {
  //   extensions: ['.js', '.jsx']
  // },
  // entry: (env !== 'production' ? [
  //   'react-hot-loader/patch',
  //   'webpack-dev-server/client?http://localhost:8080',
  //   'webpack/hot/only-dev-server'
  // ] : []).concat(['./client/index.js']),
  // devtool: 'eval-source-map',

  entry: {
    app: './client/index.js'
  },

  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: nmdir,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: nmdir,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test: /\.jsx?$/,
        exclude: nmdir,
        loaders: [
          'react-hot-loader/webpack'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: true
        }
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      filename: 'index.html',
      title: 'Chat!',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  node: {
    fs: 'empty'
  },

  devServer: {
    contentBase: './public',
    hot: true
  }
};

// if (env === 'production') {
//   plugins.push(
//     new webpack.optimize.UglifyJsPlugin(),
//     new OptimizeJsPlugin({
//       sourceMap: false
//     })
//   )
// }
