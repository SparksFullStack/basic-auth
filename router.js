module.exports = (app) => {
    // when the user visits the '/' route, the callback function is run
    // the callback receives three parameters: req, res, and next
    app.get('/', (req, res, next) => res.send('cheesedick'));
}