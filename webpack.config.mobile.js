var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReactlite = path.resolve(node_modules, 'react-lite/dist/react-lite.min.js');
var pathToRedux = path.resolve(node_modules, 'redux/dist/redux.min.js');
var pathToReactRedux = path.resolve(node_modules, 'react-redux/dist/react-redux.min.js');
var pathToReqwest = path.resolve(node_modules, 'reqwest/reqwest.min.js');

var viewPath = require("./readViewsPaths.js");

var mobilePath = viewPath.getEnvPath("mobile", false);
mobilePath["js/mobile/vendor"] = ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux', 'reqwest'];

function getConfig (timestamp,configPath,device) {
  var config  = {
    entry: mobilePath,
    output: {
      path: path.join(__dirname, 'dist/'),
      filename: configPath + '/[name]' + timestamp + '.js'  //visit path
    },
    resolve: {
      alias: {
        'react': pathToReactlite,
        'react-dom' : pathToReactlite,
        'redux' : pathToRedux,
        'react-redux' : pathToReactRedux,
        'reqwest' : pathToReqwest,
        extensions: ['', '.js', '.jsx']
      }
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react','es2015']
          }
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // {
        //     test: /\.css$/,
        //     loader: 'style!css'
        // },
        // {
        //     test: /\.less/,
        //     loader: 'style-loader!css-loader!less-loader'
        // },
        // {
        //   test: /\.(jpg|png|svg)$/,
        //   loader: 'url?limit=8192'
        // }
      ]
    },
    plugins:[
      new webpack.optimize.DedupePlugin(),
      new uglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     NODE_ENV: JSON.stringify('production')
      //   }
      // }),
      new webpack.optimize.CommonsChunkPlugin('js/mobile/vendor', configPath + "/js/mobile/vendor"+timestamp+".js"),
      // new webpack.optimize.CommonsChunkPlugin(configPath + "/js/mobile/vendor"+timestamp+".js"),
    ]
  };

  return config;
}


module.exports = getConfig;