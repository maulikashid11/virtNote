import express from 'express'
import dotenv from 'dotenv'
import user from './routes/user.route.js'
import note from './routes/note.route.js'
import { connectToDB } from './db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

//connect to database
connectToDB()

app.use(cors({
    origin: 'https://virt-note.vercel.app/',
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/user', user)
app.use('/note', note)

app.listen(port)