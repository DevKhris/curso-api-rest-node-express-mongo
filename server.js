const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// Model
const Contact = require('./src/models/contact')

dotenv.config()

const app = express()

const port = process.env.PORT
const host = process.env.HOST
const database = process.env.DATABASE_URL

mongoose.connect(database, (err, status) => {
  if (err) return console.error('[*] Can\'t connect to Database')
})

const connection = mongoose.connection

connection.on('open', () => {
  console.info(`[+] Connected to database: ${database}`)
})

const optionsCors = {
  origin: `http//${host}:${port}`
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(optionsCors))

app.set('port', port || 3000)

// Routes
app.get('/', (req, res) => {
  res.send('Hello welcome to my API')
})


app.get('/api/v1/contacts', (req, res) => {
  Contact.find(function (err, data) {
    if (err) {
      console.error(err)
    } else {
      res.send(data)
    }
  })
})


app.get('/api/v1/contacts/:contactId', (req, res) => {
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


app.post('/api/v1/contacts', (req, res) => {
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


app.put('/api/v1/contacts/:contactId', (req, res) => {
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


app.delete('/api/v1/contacts/:contactId', (req, res) => {
  const id = req.params.contactId

  let contact = Contact.findByIdAndDelete(id, function (err, data) {
    if (err) {
      console.error(err)
    } else {
      res.send("Data has been deleted succesfully")
    }
  })
})


app.listen(port, host, () => {
  console.info(`[+] Starting server, listening at http://${host}:${port}`)
})
