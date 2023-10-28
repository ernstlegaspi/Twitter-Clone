import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
	messages: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Message'
	}],
	name: String,
	username: String,
	image: String,
	lastChat: String
}, { timestamps: true })

export default mongoose.model('Conversation', conversationSchema)
