const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware( 
  compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('/farts', (req, res) => res.json(awesomejsondb))
  .post('/farts', (req, res) => {
    const name = req.body.name;
    console.log(name);

    // find if name is already in the db
    if (awesomejsondb[name]) {
      awesomejsondb[name] += 1;
    } else {
      awesomejsondb[name] = 1;
    }

    return res.json(getuserfarts(awesomejsondb, name));
  });
  
app.get('/farts/:name', (req, res) => {
  console.log(req.params)
  const name = req.params.name;
  return res.json(getuserfarts(awesomejsondb, name));
});
  
app.use(express.static(__dirname + '/www'));

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Farts being counted at http://%s:%s', host, port);
});
