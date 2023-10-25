import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'

import routes from './routes/routes.js'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json({ extended: true, limit: '30mb' }))
app.use(express.urlencoded({ extended: true, limit: '30mb' }))

const PORT = process.env.PORT || 2217

const _server = app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => _server)
	.catch(e => console.log(`Error connecting to MONGODB ${e}`))

const io = new Server(_server, {
	cors: {
		origin: ['http://localhost:3000']
	}
})

app.use(``, routes)

io.on('connect', socket => {
	console.log(socket.id)
})
