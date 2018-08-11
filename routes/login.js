const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

router.post('/', function(request, response){
    User.findOne( {username: request.body.username} ).exec((error, user) => {
        if (error) {
            throw new Error(error);
        } else {
            bcrypt.compare(request.body.password, user.password, (error, result) => {
                if (error) {
                    return response.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    return response.status(200).json({
                        success: 'Welcome to the JWT Auth'
                    });
                }
                return response.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        }
    })
});
module.exports = router;
