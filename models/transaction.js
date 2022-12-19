const mongoose = require('mongoose')


const transactionsSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    outlet: {type: mongoose.Schema.Types.ObjectId, ref: 'outlets'},
    duration: Number,
    price: Number,
    date: Date,
})

const Transaction = mongoose.model('transactions', transactionsSchema)

module.exports = Transaction