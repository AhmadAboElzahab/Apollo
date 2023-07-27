const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'

    },
    avatar: {
        type: String,

    },

})
module.exports = mongoose.model('User', userSchema)