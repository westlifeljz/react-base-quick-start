var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config.dev.js');

function run() {
  var app = new (require('express'))();
  var port = 8024;

  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  app.get("*", function(req, res) {
    console.log(req.url);
    res.sendFile(__dirname + req.url)
  });

  app.listen(port, function(error) {
    if (error) {
      console.error(error)
    } else {
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
  });
}

module.exports = run;


