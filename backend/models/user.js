import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	image: String,
	likeCount: Number,
	tweetCount: Number
}, { timestamps: true })

export default mongoose.model('User', userSchema)
