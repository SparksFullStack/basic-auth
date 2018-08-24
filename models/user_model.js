// importing mongoose and accessing it's Schema property to tell the database what to expect
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
});

// Creating the model class
const userModel = mongoose.model('user', userSchema);

// Exporting the model
module.exports = userModel;