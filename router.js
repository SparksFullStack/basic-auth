const AuthenticationController = require('./controllers/authentication_controller');

module.exports = (app) => {
    // whenever a post is made to the /signup route, the signup function exported...
    /// ...from authentication_controller will be executed as the callback
    app.post('/signup', AuthenticationController.signup);
}