const Contact = require('../models/contact')

let index = (req, res) => {
    Contact.find(function (err, data) {
        if (err) {
            console.error(err)
        } else {
            res.send(data)
        }
    })
}


let show = (req, res) => {
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
}

let store = (req, res) => {
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
}

let update = (req, res) => {
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
}

let destroy = (req, res) => {
    const id = req.params.contactId

    let contact = Contact.findByIdAndDelete(id, function (err, data) {
        if (err) {
            console.error(err)
        } else {
            res.send("Data has been deleted succesfully")
        }
    })
}

exports.index = index

exports.show = show

exports.store = store

exports.update = update

exports.destroy = destroy