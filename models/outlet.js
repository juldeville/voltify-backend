const mongoose = require('mongoose')

const outletsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings' },
    address: String,
    longitude: Number,
    latitude: Number,
    type: String,
    price: Number,
    availability: Boolean,
    votes: [Number],
})

const Outlet = mongoose.model('outlets', outletsSchema)

module.exports = Outlet;

