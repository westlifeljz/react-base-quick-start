var path = require('path');
var webpack = require('webpack');

module.exports = {
  // multiple page package
  entry: {
    test1:[
      'webpack-hot-middleware',
      './src/pages/test1.js'
    ],
    test2:[
      'webpack-hot-middleware',
      './src/pages/test2.js'
    ],
    vendor: ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux', 'react-router']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },


  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
          test: /\.css$/,
          loader: 'style!css'
      },
      {
          test: /\.less/,
          loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url?limit=8192'
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
    	//'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};

