const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const user = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, trim: true, unique: true },
    hash_password: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    registeredData: { type: Date, default: Date.now },
});

user.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.hash_password);
};

module.exports = mongoose.model('User', user);