import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
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
	following: {
		type: Number,
		default: 0
	},
	followers: {
		type: Number,
		default: 0
	}
}, { timestamps: true })

export default mongoose.model('User', userSchema)
