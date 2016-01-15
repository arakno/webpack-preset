const path = require('path');
const fs = require('fs');

const express = require('express');
const serveStatic = require('serve-static');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const buildConfig = require('./config');

const app = express();
const config = buildConfig();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: { colors: true },
  publicPath: config.output.publicPath
}));

try {
  fs.accessSync('./static/index.html', fs.R_OK)
  app.use(express.static('./static'))
} catch (e) {
  app.use(express.static(path.join(__dirname, '../static')))
}

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`==> 🌎  listening on port 3000`);
  }
});
