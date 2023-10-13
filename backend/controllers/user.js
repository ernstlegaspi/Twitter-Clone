import User from '../models/user.js'
import Tweet from '../models/tweet.js'

import otp from 'otp-generator'
import nodeMailer from 'nodemailer'
import mailGen from 'mailgen'

import { badReq, serverError, success } from '../utils/index.js'

export const getCurrentUser = async (req, res) => {
	try {
		const { id } = req.params
		
		const user = await User.findById({ _id: id })

		if(!user) return serverError(res)

		success(res, user, 'Current user retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getUserLikedTweets = async (req, res) => {
	try {
		const { username } = req.params

		const user = await User.findOne({ username })
		const tweets = await Tweet.find({ likedUserId: user._id.toString() })

		success(res, tweets, 'Successfully Fetched Liked Tweets')
	}
	catch(error) {
		serverError(res)
	}
}
export const likeTweet = async (req, res) => {
	try {
		const { id, userId } = req.body

		if(!id) return badReq(res, 'Not a valid tweet')
		
		if(!userId) return badReq(res, 'User not logged in')

		const tweet = await Tweet.findByIdAndUpdate(id,
			{ $push: { likedUserId: userId } },
			{ new: true }
		)

		if(!tweet) return serverError(res)

		success(res, tweet, 'Tweet liked')
	}
	catch(error) {
		serverError(res)
	}
}

export const updateUserTweetCount = async (req, res) => {
	try {
		const { id } = req.body

		const user = await User.findById({ _id: id })

		const updatedUser = await User.findOneAndUpdate({ _id: id }, { tweetCount: user.tweetCount + 1 })

		if(!user) return serverError(res)

		success(res, updatedUser, 'Tweet count updated')
	}
	catch(error) {
		serverError(res)
	}
}

// OTP
export const generateOtp = (req, res) => {
	const newOtp = otp.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

	if(!newOtp) return serverError(res)

	const { name, email } = req.body

	const config = {
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		}
	}

	const transporter = nodeMailer.createTransport(config)

	const mailGenerator = new mailGen({
		theme: "default",
		product: {
			name: "Mailgen",
			link: 'https://mailgen.js/'
		}
	})

	const response = {
		body: {
			name,
			intro: "Verification Code Generated",
			table: {
				data: [
					{
						otp: newOtp
					}
				]
			},
			outro: "Thank you for using Twitter Clone"
		}
	}

	const mail = mailGenerator.generate(response)

	const message = {
		from : process.env.EMAIL,
		to: email,
		subject: "Verification Code",
		html: mail
	}

	transporter.sendMail(message)
	.catch(error => serverError(res))

	success(res, { otp: newOtp }, 'OTP Generated')
}
