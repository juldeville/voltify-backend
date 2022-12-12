const mongoose = require('mongoose')

const outletsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings' },
    longitude: Number,
    latitude: Number,
    type: String,
    price: Number,
    availability: Boolean,
})

const Outlet = mongoose.model('outlets', outletsSchema)

module.exports = Outlet;

