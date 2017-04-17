const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const PORT = process.env.PORT || 8080;
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { hot: true, noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/user', (req, res) => {
  res.send(req.body);
});

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});