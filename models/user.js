const mongoose = require('mongoose')

const addressesSchema = mongoose.Schema({
    number: Number,
    street: String,
    zipcode: String,
    city: String,
    
})

const usersSchema = mongoose.Schema({
    token: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    photo: String,
    iban: String,
    address: addressesSchema
})

const User = mongoose.model('users', usersSchema)

module.exports = User