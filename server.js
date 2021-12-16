const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Routes
const contactsRouter = require('./src/routes/contacts')

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
  origin: `http://${host}:${port}`
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(optionsCors))
app.use(morgan('dev'))


app.set('port', port || 3000)

// Routes
app.get('/', (req, res) => {
  res.send('Hello and welcome to my contacts API')
})

app.use('/api/v1/contacts/', contactsRouter)

app.listen(port, host, () => {
  console.info(`[+] Starting server, listening at http://${host}:${port}`)
})
