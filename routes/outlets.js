var express = require('express');
var router = express.Router();
const Outlet = require('../models/outlet');
const { checkBody } = require('../modules/checkBody');
const User = require('../models/user')
//add new outlet

router.post('/addOutlet', (req, res) => {
    if (!checkBody(req.body, ['longitude', 'latitude', 'type', 'price', 'availability'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    User.findOne({ token: req.body.token }).then(data => {
        console.log(data)
        if (data) {
            const newOutlet = new Outlet({
                user: data._id,
                address: req.body.address,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                type: req.body.type,
                price: req.body.price,
                availability: req.body.availability,
            })

            newOutlet.save().then(newDoc => {
                console.log(newDoc)
                res.json({ result: true })
            })
        } else {
            res.json({ result: false, error: 'No user found' });
        }
    })

})

//display all outlet data

router.get('/displayOutlet', (req, res) => {
    Outlet.find().then(data => {
        if (data !== null) {
            res.json({ result: true, data: data })
        } else {
            res.json({ result: false, error: 'Error' })
        }
    })
})

//delete outlet


router.delete('/deleteOutlet', (req, res) => {
    User.findOne({ token: req.body.token }).then(data => {
        Outlet.deleteOne({ user: data._id }).then(data => {
            if (data.deletedCount > 0) {
                res.json({ result: true })
            } else {
                res.json({ result: false, error: 'Outlet not found' })
            }
        })
    })
})

module.exports = router;