import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()

const port = process.env.PORT
const host = process.env.HOST

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.set('port', port || 3000)

app.get('/', (req, res) => {
    res.send('Hello API')
})

app.listen(port, host, () => {
    console.info(`[+] Starting server at http://${host}:${port}`)
})

export default app
