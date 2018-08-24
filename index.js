const express = require('express');
// morgan is a logging framework
const morgan = require('morgan');
// http is a native node library that used for handling incoming HTTP requests
const http = require('http');
// importing the router function we created that contains all the routes
const router = require('./router');
// importing mongoose to connect to our instace of MongoDB
const mongoose = require('mongoose');

// initializing express
const app = express();

// Database Setup: Linking our instaces of MongoDB with Mongoose
// whatever we add after the localhost will be the name of the database we're creating
mongoose.connect('mongodb://localhost:27017/auth')

// App Setup: getting express working locally the way we want it to
app.use(morgan('combined'));
app.use(express.json());
// passing app into router gives the routing access to our whole express app
router(app);

// Server Setup: allows express to talk to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => console.log(`the server is listening on port ${port}`));