import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import routes from './routes/routes.js'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json({ extended: true, limit: '30mb' }))
app.use(express.urlencoded({ extended: true, limit: '30mb' }))

const PORT = process.env.PORT || 2217

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server is running in port ${PORT}`)))
	.catch(e => console.log(`Error connecting to MONGODB ${e}`))

app.use(``, routes)
