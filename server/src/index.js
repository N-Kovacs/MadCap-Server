// load .env data into process.env
// require('dotenv').config();
require("./environment");
// const helmet = require("helmet");
// const cors = require("cors");

// Web server config
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8001;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


  // Pass to next layer of middleware
  next();
});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const catgeoriesRoutes = require('./routes/categories-api');
const gamesRoutes = require('./routes/games-api');
const userRoutes = require('./routes/users-api')
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/api/categories', catgeoriesRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/users', userRoutes);

//creates socket servers
const http = require("http").createServer(app);
app.io = require("socket.io")(http);

//lets sockets connect
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

//runs socket logic
require("./routes/sockets")(app);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);

// });
module.exports = app;
