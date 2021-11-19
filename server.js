import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()

const port = process.env.PORT
const host = process.env.HOST

var contacts = [
    {
        name: 'John Doe',
        email: 'john@example.com'
    },

    {
        name: 'Jane Doe',
        email: 'jane@example.com'
    }
]

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.set('port', port || 3000)

app.get('/', (req, res) => {
    res.send('Hello API')
})

app.get('/contacts', (req, res) => {
    res.send(contacts)
})

app.get('/contacts/:contactId', (req, res) => {
    let id = req.params.contactId
    res.send(contacts[id])
})

app.post('/contacts', (req, res) => {
    contacts.push({ name: req.body.name, email: req.body.email })
    res.send(contacts)
})

app.put('/contacts/:contactId', (req, res) => {
    let id = req.params.contactId
    contacts[id] = { name: req.body.name, email: req.body.email }
    res.send(contacts[id])
})

app.delete('/contacts/:contactId', (req, res) => {
    let id = req.params.contactId
    contacts.splice(id, 1)
    res.send(contacts)
})


app.listen(port, host, () => {
    console.info(`[+] Starting server at http://${host}:${port}`)
})

export default app
