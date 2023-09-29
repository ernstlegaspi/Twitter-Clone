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
	username: String,
	phoneNumber: String,
	birthday: String,
	gender: String,
	image: String,
	likeCount: Number,
	following: Number,
	followers: Number
}, { timestamps: true })

export default mongoose.model('User', userSchema)
