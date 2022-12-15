const mongoose = require('mongoose')


const usersSchema = mongoose.Schema({
    token: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    photo: String,
    iban: String,
    address: String,
})

const User = mongoose.model('users', usersSchema)

module.exports = User