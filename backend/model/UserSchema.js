const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        maxlength: 255,
    },

}, { timestamps: true });

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;