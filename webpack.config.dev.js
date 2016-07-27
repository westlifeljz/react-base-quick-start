var path = require('path');
var webpack = require('webpack');
var viewEnterPaths = require("./readViewsPaths.js").getAllEnvPath(true);

viewEnterPaths["js/pc/vendor"] = ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux', 'reqwest'];
viewEnterPaths["js/mobile/vendor"] = ['react', 'react-dom','redux', 'redux-thunk', 'react-redux', 'reqwest'];
viewEnterPaths["js/pad/vendor"] = ['react', 'react-dom','redux', 'redux-thunk', 'react-redux', 'reqwest'];

module.exports = {
  devtool: 'eval',
  // entry: {
  //   "js/mobile/test1":[
  //     'webpack-hot-middleware',
  //     './src/views/mobile/test1.js'
  //   ],
  //   "js/pc/test2":[
  //     'webpack-hot-middleware',
  //     './src/views/pc/test2.js'
  //   ],
  //
  // },
  entry: viewEnterPaths,
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'dist/dev/[name].js'  //visit path
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('js/pc/vendor', "dev/js/pc/vendor.js"),
    // new webpack.optimize.CommonsChunkPlugin('js/mobile/vendor', "dev/js/mobile/vendor.js"),
    // new webpack.optimize.CommonsChunkPlugin('js/pad/vendor', "dev/js/pad/vendor.js"),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
    ],
  }
}