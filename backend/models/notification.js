import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
	tweetId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Tweet'
	},
	notificationType: String,
	image: String,
	name: String,
	body: String,
	message: String,
	username: String
})

export default mongoose.model('Notification', notificationSchema)
