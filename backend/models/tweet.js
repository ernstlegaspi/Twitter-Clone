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
	likedUserId: [String],
	image: String,
	commentsId: [String],
	likeCount: Number,
	bookmarkCount: Number
}, { timestamps: true })

export default mongoose.model('Tweet', tweetSchema)
