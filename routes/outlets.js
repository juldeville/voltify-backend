var express = require('express');
var router = express.Router();
const Outlet = require('../models/outlets');

//add new outlet

router.post('/addOutlet', (req, res) => {
    if (!checkBody(req.body, ['longtitude', 'lattitude', 'type', 'price', 'availability'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }

    User.findOne({token: req.body.token}).then(data => {
        if (data === null) {
            const newOutlet = new Outlet({
                user: data._id,
                longitude: req.body.longitude,
                lattitude: req.body.lattitude,
                type: req.body.type,
                price: req.body.price,
                availability: req.body.availability,
            })
         
        newOutlet.save().then(newDoc => {
            res.json({result: true})
        })
        } else {
            res.json({result: false, error: 'No user found'});
        }
    })

})

//display all outlet data

router.get('/displayOutlet', (req, res) => {
    Outlet.find().then(data => {
        if (data !== null){
            res.json({result: true, data: data})
        } else {
            res.json({result: false, error: 'Error'})
        }        
    })
})

//delete outlet

router.delete('/deleteOutlet', (req, res) => {
    Outlet.deleteOne({token: req.body.token}).then(data => {
        if (data.deleteCount > 0) {
            res.json({result: true})
        } else {
            res.json({result: false, error: 'Outlet not found'})
        }
    })
})