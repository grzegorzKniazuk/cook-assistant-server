const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const mongoose = require('mongoose');

router.post('/', (request, response) => {
    bcrypt.hash(request.body.password, 10, function(error, hash){
        if(error) {
            throw new Error(error);
        } else {
            const user = new User({
                _id: new  mongoose.Types.ObjectId(),
                username: request.body.username,
                password: hash,
                email: request.body.email,
            });
            user.save((error, user) => {
                if (error) {
                    throw new Error(error);
                } else {
                    console.log(`${user.username} registered.`);
                    response.json(user);
                }
            });
        }
    });
});

module.exports = router;
