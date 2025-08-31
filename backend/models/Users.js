const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true
    },
    verified: {
        type: Boolean,
        default: false, // new users are not verified
    },
    verificationToken: {
        type: String,
    },
})

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User