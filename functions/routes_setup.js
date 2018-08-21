const userController = require('./user_controller');

function routes_setup(app) {
    app.post('/register-container', userController.register);
    app.post('/login', userController.login);
    app.post('/isLoggedIn', userController.isLoggedIn);
    app.get('/loadUserData', userController.loadUserData);
}

module.exports = routes_setup;
