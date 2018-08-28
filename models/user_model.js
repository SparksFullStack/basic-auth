// importing mongoose and accessing it's Schema property to tell the database what to expect
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// importing bcrypt to hash our passwords
const bcrypt = require('bcrypt-nodejs')

// Defining the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
});

// on the save hook we're going to encrypt the password
userSchema.pre('save', (next) => {
    // this gets access to the User Model we're accessing here
    // here 'user' is an instance of the User Model
    const user = this;

    // generating a salt (random string of characters) with 10 rounds
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }

        // hashing the user password, adding the salt, and then setting the model to save's password to the hashed password
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err) }

            user.password = hash;
            next();
        })
    })
})

// Creating the model class
const UserModel = mongoose.model('user', userSchema);

// Exporting the model
module.exports = UserModel;