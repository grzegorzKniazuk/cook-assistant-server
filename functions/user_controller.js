const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
const User = require('../models/user.model');

exports.register = function(request, response){
    let newUser = new User(request.body);

    newUser.hash_password = bcrypt.hashSync(request.body.password, 10);
    newUser.save((error) => {
        if (error) {
            switch (error.code) { // uzytkownik lub email istnieje w bazie
                case 11000: {
                    response.send('Already registered');
                }
            }
        } else {
            response.send('Register successful');
        }
    });
};
exports.login = function(request, response){
    User.findOne({username: request.body.username}, (error, user) => {
        if (error) {
            throw new Error(error);
        }
        if (!user) {
            response.status(401).send('Unauthorized');
            return false;
        } else if (user) {
            user.comparePassword(request.body.password).then(isCorrect => {
                if (!isCorrect) {
                    response.status(401).send('Unauthorized');
                    return false;
                } else {
                    const jwtBearerToken = jwt.sign({ email: user.email, username: user.username, _id: user._id }, 'RESTFULAPIs', {
                        subject: user._id.toString(),
                    });
                    response.status(200).json({ token: jwtBearerToken });
                }
            });

        }
    });
};

exports.isLoggedIn = function (request, response) {
    jwt.verify(request.body.token, 'RESTFULAPIs', (error) => {
        if (error) {
            response.send(false);
        } else {
            response.send(true);
        }
    });
};

exports.loadUserData = function (request, response) {
    const currentUser = jwt_decode(request.headers.authorization);
    User.findOne({_id: currentUser._id}, (error, userData) => {
        const data = {
            'username': userData.username,
            'email': userData.email,
        };
        if (error) {
            throw new Error(error);
        } else {
            response.json(data);
        }
    })
};


























