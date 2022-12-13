var express = require('express');
var router = express.Router();
const Booking = require('../models/booking');




router.get('/displayBooking/:outlet/:date', (req,res) => {
    const { date, outlet } = req.params;
    const dateObj = new Date(date);
    let dateObjPlus = new Date(date);
    dateObjPlus.setDate(dateObjPlus.getDate()+30)
    Booking.find({
        outlet,
        date: {$gte : dateObj, $lt: dateObjPlus},
    }).then(data => {
        if (data.length > 0) {
            res.json({result: true, allBookings: data})
        } else {
            res.json({result: false, error: 'no slot found'})
        }
    })
})

router.post('/addBooking/', (req, res) => {
    const newBooking = new Booking({
        outlet: req.body.outlet,
        user: req.body.user,
        date: req.body.date,
        isPaid: false,
        finalPrice: req.body.finalPrice,
        duration: req.body.duration,
    })
})

module.exports = router;






