const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const bodyParser = require('body-parser');
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

// placeholder for a real DB
let awesomejsondb = {};

function getusercount(db, name) { return { [name]: db[name]}}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/count', (req, res) => res.json(awesomejsondb))
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
  
app.use(express.static(__dirname + '/www'));

const server = app.listen(3000, function() {
  const port = server.address().port;
  console.log(`Server being started at localhost:${port}`);
});
