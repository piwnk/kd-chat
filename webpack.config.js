const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const OptimizeJsPlugin = require('optimize-js-plugin')

const env = process.env.NODE_ENV || 'undefined';
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
console.log(env);

module.exports = {
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json', '.html']
  },

  entry: (env !== 'production' ? [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ] : []).concat(['./client/index.jsx']),

  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: nodeModulesDir,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: nodeModulesDir,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test: /\.jsx?$/,
        exclude: nodeModulesDir,
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

  // devServer: {
  //   contentBase: './public',
  //   // publicPath: './server',
  //   hot: true
  // }
};

// if (env === 'production') {
//   plugins.push(
//     new webpack.optimize.UglifyJsPlugin(),
//     new OptimizeJsPlugin({
//       sourceMap: false
//     })
//   )
// }
