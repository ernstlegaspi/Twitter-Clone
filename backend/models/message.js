import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	}
}, { timestamps: true })

export default mongoose.model('Message', messageSchema)
