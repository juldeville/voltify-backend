var express = require('express');
var router = express.Router();
const Transaction = require('../models/transaction');
const User = require('../models/user')



//POST Transaction
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
                res.json({ result: true, transactionData: newDoc })
            })
        } else {
            res.json({ result: false, error: 'No user found' });
        }
    })

})


//GET Transaction
router.get('/addTransaction/:token', (req, res) => {
    User.findOne({ token: req.params.token }).then(data => {
        console.log('findOne params token', data)
        console.log('USER ID IS...', data._id)
        Transaction.find({ user: data._id }).then(data => {
            console.log('should be Transaction Data', data)
            if (data) {
                res.json({ result: true, outlet: data })
            } else {
                res.json({ result: false, error: 'error detected' })
            }
        })
    })
})




module.exports = router;






