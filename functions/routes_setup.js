const loginRouter = require('../routes/login');
const registerRouter = require('../routes/register');

function routes_setup(app) {
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
}

module.exports = routes_setup;