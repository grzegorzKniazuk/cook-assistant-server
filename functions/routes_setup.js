const userController = require('./user_controller');

function routes_setup(app) {
    app.route('/register')
        .post(userController.register);
    app.route('/login')
        .post(userController.login);
}

module.exports = routes_setup;