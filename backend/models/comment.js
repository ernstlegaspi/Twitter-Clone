import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({ 
	tweetId: {
		type: String,
		required: String
	},
	userId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	username: {
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
	commentCount: {
		type: Number,
		default: 0
	},
	likeCount: {
		type: Number,
		default: 0
	},
	retweetCount: {
		type: Number,
		default: 0
	}
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema)
