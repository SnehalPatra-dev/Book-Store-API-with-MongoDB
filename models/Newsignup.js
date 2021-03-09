const mongoose = require('mongoose');
const newsignupSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    mlname: {
        type: String,
        required: false,
    },
    emailid: String,
    contact: Number,
    ad1: {
        type: String,
        required: true,
    },
    ad2: {
        type: String,
        required: true,
    },
    ad3: {
        type: String,
        required: true,
    },
    ad4: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password1: {
        type: String,
        required: true,
    },
    confirmPassword: String,
});

module.exports = mongoose.model('Newsignup', newsignupSchema);