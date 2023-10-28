import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
	messages: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Message'
	}],
	users: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	lastChat: String
}, { timestamps: true })

export default mongoose.model('Conversation', conversationSchema)
