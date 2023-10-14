import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: ''
	},
	likeCount: {
		type: Number,
		default: 0
	},
	bookmarkCount: {
		type: Number,
		default: 0
	},
	retweetCount: {
		type: Number,
		default: 0
	},
	commentsCount: {
		type: Number,
		default: 0
	},
	likedUserId: [String],
	commentsId: [String],
}, { timestamps: true })

export default mongoose.model('Tweet', tweetSchema)
