var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var pathToReactlite = path.resolve(node_modules, 'react-lite/dist/react-lite.min.js');
var pathToRedux = path.resolve(node_modules, 'redux/dist/redux.min.js');
var pathToReactRedux = path.resolve(node_modules, 'redux/dist/react-redux.min.js');

var viewEnterPaths = require("./readViewsPaths.js").getAllEnvPath(false);

viewEnterPaths["js/pc/vendor"] = ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux'];
viewEnterPaths["js/mobile/vendor"] = ['react-lite', 'react-dom','redux', 'redux-thunk', 'react-redux'];
viewEnterPaths["js/pad/vendor"] = ['react-lite', 'react-dom','redux', 'redux-thunk', 'react-redux'];

function getConfig (timestamp,configPath,device) {
  var alias = {
    'react': pathToReactlite,
    'react-dom' : pathToReact,
    'redux' : pathToRedux,
    'pathToReactRedux' : pathToReactRedux
  };
  var config  = {
    entry: viewEnterPaths,
    output: {
      path: path.join(__dirname, 'dist/'),
      filename: configPath + '/[name]' + timestamp + '.js'  //visit path
    },
    resolve: {
      alias: {
        'react': pathToReact,
        'react-dom' : pathToReactDom,
        'react-lite': pathToReactlite,
        'react-lite-dom':pathToReactlite,
        'redux' : pathToRedux,
        'react-redux' : pathToReactRedux,
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
      new webpack.optimize.CommonsChunkPlugin('js/pc/vendor', configPath + "/js/pc/vendor"+timestamp+".js"),
    ]
  };

  return config;
}


module.exports = getConfig;