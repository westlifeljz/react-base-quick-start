var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var pathToRedux = path.resolve(node_modules, 'redux/dist/redux.min.js');
var pathToReactRedux = path.resolve(node_modules, 'react-redux/dist/react-redux.min.js');

var viewPath = require("./readViewsPaths.js");

var pcPath = viewPath.getEnvPath("pc", false);
pcPath["js/pc/vendor"] = ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux', 'reqwest'];

function getConfig (timestamp,configPath,device) {
  var config  = {
    entry: pcPath,
    output: {
      path: path.join(__dirname, 'dist/'),
      filename: configPath + '/[name]' + timestamp + '.js'  //visit path
    },
    resolve: {
      alias: {
        'react': pathToReact,
        'react-dom' : pathToReactDom,
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