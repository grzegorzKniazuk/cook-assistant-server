const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.register = function(request, response){
    let newUser = new User(request.body);
    newUser.hash_password = bcrypt.hashSync(request.body.password, 10);
    newUser.save((error, user) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log(`${user.username} registered.`);
            response.json(user);
        }
    });
};
exports.login = function(request, response){
    User.findOne({username: request.body.username}, (error, user) => {
        if (error) {
            throw new Error(error);
        }
        if (!user) {
            response.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(request.body.password)) {
                response.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return response.json({token: jwt.sign({ email: user.email, fullName: user.username, _id: user._id}, 'RESTFULAPIs')});
            }
        }
    });
};
exports.loginRequired = function(request, response, next){
    if (request.user) {
        next();
    } else {
        return response.status(401).json({ message: 'Unauthorized user!' });
    }
};