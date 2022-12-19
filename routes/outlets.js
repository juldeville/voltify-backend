var express = require('express');
var router = express.Router();
const Outlet = require('../models/outlet');
const { checkBody } = require('../modules/checkBody');
const User = require('../models/user')
//add new outlet

router.post('/addOutlet', (req, res) => {
    if (!checkBody(req.body, ['longitude', 'latitude', 'type', 'price', ])) {
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

//add new vote
router.put('/addVote', (req, res) => {
    console.log(req.body)
    Outlet.updateOne({_id: req.body.id}, { $push: {votes: req.body.vote }}).then(data => {
        console.log(data)
        if (data.modifiedCount > 0) {
            console.log('successful vote')
            res.json({result: true})
        } else {
            console.log('failed to vote')
            res.json({result: false})
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

//get userOutlet

router.get('/displayUserOutlet/:token', (req, res) => {
    User.findOne({token: req.params.token}).then(data => {
        console.log('findOne params token', data)
        console.log('juste dataID', data._id)
        Outlet.findOne({user: data._id}).then(data => {
            console.log('should be outlet Data', data)
            if (data) {
                res.json({result: true, outlet: data})
            } else {
                res.json({result: false, error: 'error detected'})
            }
        })
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