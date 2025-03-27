import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8001

app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {console.log(`Server listening at PORT: ${PORT}`)})