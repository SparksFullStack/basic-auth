const express = require('express');
// morgan is a logging framework
const morgan = require('morgan');
// http is a native node library that used for handling incoming HTTP requests
const http = require('http');
const app = express();

// App Setup: getting express working locally the way we want it to
app.use(morgan('combined'));
app.use(express.json());

// Server Setup: allows express to talk to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => console.log(`the server is listening on port ${port}`));