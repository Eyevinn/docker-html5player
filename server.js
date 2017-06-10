const express = require('express'),
  fs = require('fs'),
  bodyParser = require('body-parser');

const app = express();
const oneYear = 31536000 * 1000;

app.use(express.static(__dirname + '/public', { maxAge:oneYear }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  const address = server.address(),
    port = address.port,
    host = address.address,
    formattedHost = address.family === 'IPv6' ? '[' + host + ']' : host;

  console.log('Player backend listening at http://%s:%s', formattedHost, port)
});

app.get("/", (req, res) => {
  const src = process.env.SOURCE || 'https://lab.eyevinn.technology/webm/tos/tearsofsteel.mpd';
  res.render("index.ejs", { source: src });
});