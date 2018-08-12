const userController = require('./user_controller');

function routes_setup(app) {
    app.route('/register')
        .post(userController.register);
    app.route('/login')
        .post(userController.login);
    app.route('/isLoggedIn')
        .post(userController.isLoggedIn);
    app.route('/loadUserData')
        .get(userController.loadUserData);
}

module.exports = routes_setup;