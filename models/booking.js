const mongoose = require('mongoose')

const bookingsSchema = mongoose.Schema({
    outlet: {type: mongoose.Schema.Types.ObjectId, ref: 'outlets'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    date: Date,
    isPaid: Boolean,
    finalPrice: Number,
    duration: Date,
    votes: Number,
})

const Booking = mongoose.model('bookings', bookingsSchema);

module.exports = Booking