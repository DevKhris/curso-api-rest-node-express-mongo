const express = require('express')
const router = express.Router()

const Contact = require('../models/contact')

router.get('/', (req, res) => {
    Contact.find(function (err, data) {
        if (err) {
            console.error(err)
        } else {
            res.send(data)
        }
    })
})

router.get('/:contactId', (req, res) => {
    const id = req.params.contactId
    let contact = Contact.findOne({
        _id: id
    }, function (err, data) {
        if (err) {
            console.error(err)
        } else {
            res.json(data)
        }
    })
})

router.post('/', (req, res) => {
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })

    contact.save(function (err, data) {
        if (err) {
            console.error(err)
        } else {
            res.send('Data has been inserted succesfully')
        }
    })
})

router.put('/:contactId', (req, res) => {
    const id = req.params.contactId
    let contact = Contact.findByIdAndUpdate(id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        updated_at: new Date()
    }, function (err, data) {
        if (err) {
            console.error(err)
        } else {
            res.send("Data has been updated succesfully")
        }
    })

})

router.delete('/:contactId', (req, res) => {
    const id = req.params.contactId

    let contact = Contact.findByIdAndDelete(id, function (err, data) {
        if (err) {
            console.error(err)
        } else {
            res.send("Data has been deleted succesfully")
        }
    })
})

module.exports = router