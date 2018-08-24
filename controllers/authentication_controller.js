// importing the User model class we created
const UserModel = require('../models/user_model');

exports.signup = (req, res, next) => {
    // grabbing the email and password sent in the body of the request
    const { email, password } = req.body;
    
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
            // if the user was saved successfully, we'll return the user
            res.json(newUser);
        })
    })
}