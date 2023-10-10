import User from '../models/user.js'
import Tweet from '../models/tweet.js'

import otp from 'otp-generator'
import nodeMailer from 'nodemailer'
import mailGen from 'mailgen'

export const getUserLikedTweets = async (req, res) => {
	try {
		const { username } = req.params

		const user = await User.findOne({ username })
		const tweets = await Tweet.find({ likedUserId: user._id.toString() })

		res.status(200).json({
			success: true,
			result: tweets,
			message: 'Successfully Fetched Liked Tweets'
		})
	}
	catch(error) {
		res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error',
			error
		})
	}
}

export const likeTweet = async (req, res) => {
	try {
		const { id, userId } = req.body

		if(!id) return res.status(400).json({
			success: false,
			result: null,
			message: 'Not a valid tweet'
		})

		if(!userId) return res.status(400).json({
			success: false,
			result: null,
			message: 'User not logged in'
		})

		const tweet = await Tweet.findByIdAndUpdate(id,
			{ $push: { likedUserId: userId } },
			{ new: true }
		)

		if(!tweet) return res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error'
		})

		res.status(200).json({
			success: true,
			result: tweet,
			message: 'Tweet liked'
		})
	}
	catch(error) {
		res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error',
			error
		})
	}
}

export const generateOtp = (req, res) => {
	const newOtp = otp.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

	if(!newOtp) return res.status(500).json({
		success: false,
		result: null,
		message: 'Internal Server Errorr'
	})

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
	.catch(error => {
		return res.status(500).json({ error })
	})

	res.status(200).json({ otp: newOtp })
}
