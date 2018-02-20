const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const bodyParser = require('body-parser');
const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  })
);

// placeholder for a real DB
let awesomejsondb = {};
function getallusercounts(db) {
  let allusers = [];
  for (let k in db) {
    allusers.push({ 'name': k, 'count': db[k] });
  }
  return allusers;
}

function getusercount(db, name) {
  return { name, count: db[name]}
}

app.get('/count', (req, res) => res.json(getallusercounts(awesomejsondb)))
  .post('/count', (req, res) => {
    const name = req.body.name;

    // find if name is already in the db
    if (awesomejsondb[name]) {
      awesomejsondb[name] += 1;
    } else {
      awesomejsondb[name] = 1;
    }

    return res.json(getusercount(awesomejsondb, name));
  });

app.get('/count/:name', (req, res) => {
  const name = req.params.name;
  return res.json(getusercount(awesomejsondb, name));
});
  
app.use(express.static(__dirname + '/www'));

const server = app.listen(3000, function() {
  const host = server.address().host;
  const port = server.address().port;
  console.log(`Server being started at localhost:${port}`);
});
