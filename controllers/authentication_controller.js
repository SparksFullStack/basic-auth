// importing the User model class we created
const UserModel = require('../models/user_model');

// importing the JWT library as well as the config file
const jwt = require('jwt-simple');
const config = require('../config');

// writing a function that takes our user's ID and encodes it with our secret from the config file
// takes the user model as a parameter
const tokenForUser = (user) => {
    // creating a timestamp to place into the JWT
    const timestamp = new Date().getTime();

    // returning the result of the .encode() method off of the JWT-Simple library
    // .encode takes in the information to encode (as an object), and the secret from our config file as parameters
    // sub should be set equal to the property from the user that we're going to use for the JWT...
    // ...we want to always use something permanent to set the JWT, so nothing like an email address that can change
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = (req, res, next) => {
    // grabbing the email and password sent in the body of the request
    const { email, password } = req.body;

    // returning an error if both email and password are not present
    if (!email || !password) return res.status(422).send({ error: 'You must provided an email and a password' });

    // checking if the user with that email already exists by searching the database
    UserModel.findOne({ email: email }, (err, existingUser) => {
        // if there's an error, pass it on
        if (err) return next(err);
        // if the user already exists, return with an 'unprocessable entity' status code
        if (existingUser) return res.status(422).send({ error: "Email is in use" });

        // create a new instace of the User class
        const newUser = new UserModel({ email, password });

        // saves the user to the DB
        newUser.save((err) => {
            // if there was an error, pass it on
            if (err) return next(err);
            // returning the result of calling our token method with the user passed in as the response to the client
            res.json({ token: tokenForUser(newUser) });
        })
    })
}