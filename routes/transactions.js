var express = require('express');
var router = express.Router();
const Transaction = require('../models/transaction');
const User = require('../models/user')




router.post('/addTransaction', (req, res) => {

    User.findOne({ token: req.body.token }).then(data => {
        console.log(data)
        if (data) {
            const newTransaction = new Transaction({
                user: data._id,
                outlet: req.body.id,
                duration: req.body.duration,
                price: req.body.price,
                date: req.body.date,
            })

            newTransaction.save().then(newDoc => {
                console.log(newDoc)
                res.json({ result: true, transactionData: data })
            })
        } else {
            res.json({ result: false, error: 'No user found' });
        }
    })

})




module.exports = router;






