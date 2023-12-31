import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		default: ''
	},
	birthday: {
		type: String,
		default: ''
	},
	gender: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	likeCount: {
		type: Number,
		default: 0
	},
	tweetCount: {
		type: Number,
		default: 0
	},
	followers: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	following: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	tweets: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Tweet'
	}],
	pinnedTweet: {
		type: mongoose.Schema.ObjectId,
		ref: 'Tweet'
	},
	notifications: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Notification'
	}],
	notificationCount: {
		type: Number,
		default: 0
	},
	bookmark: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Tweet'
	}],
	conversations: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Conversation'
	}]
}, { timestamps: true })

export default mongoose.model('User', userSchema)
