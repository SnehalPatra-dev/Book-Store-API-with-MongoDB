const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);


/* Note that mongoose is intelligent. It automatically converts singular to plural.
   While creating a collection, User will get changed to Users
*/