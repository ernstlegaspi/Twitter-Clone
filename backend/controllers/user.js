import User from '../models/user.js'
import Tweet from '../models/tweet.js'

import otp from 'otp-generator'
import nodeMailer from 'nodemailer'
import mailGen from 'mailgen'

import { clientError, serverError, success } from '../utils/index.js'

export const getUsers = async (req, res) => {
	try {
		const users = await User.find()

		if(!users) return clientError(res, 'No user', 404)
		
		success(res, users, 'Users Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getCurrentUser = async (req, res) => {
	try {
		const { id } = req.params

		if(!id) return clientError(res, 'Current user id not found')
		
		const user = await User.findById({ _id: id })

		if(!user) return clientError(res, 'User not found', 404)

		success(res, user, 'Current user retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getUserLikedTweets = async (req, res) => {
	try {
		const { username } = req.params

		if(!username) return clientError(res, 'Username undefined')

		const user = await User.findOne({ username })

		if(!user) return clientError(res, 'User not found', 404)

		const tweets = await Tweet.find({ likedUserId: user._id.toString() })

		if(!tweets) return clientError(res, 'No liked tweets', 404)

		success(res, tweets, 'Successfully Fetched Liked Tweets')
	}
	catch(error) {
		serverError(res)
	}
}
export const likeTweet = async (req, res) => {
	try {
		const { id, userId } = req.body

		if(!id) return clientError(res, 'Tweet id not found')
		
		if(!userId) return clientError(res, 'User not logged in')

		const tweet = await Tweet.findByIdAndUpdate(id,
			{ $push: { likedUserId: userId } },
			{ new: true }
		)

		if(!tweet) return clientError(res, 'Can not like tweet')

		success(res, tweet, 'Tweet liked')
	}
	catch(error) {
		serverError(res)
	}
}

export const unlikeTweet = async (req, res) => {
	try {
		const { id, userId } = req.body

		if(!id || !userId) return clientError(res, 'Tweet id and/or userId undefined')

		const likedTweet = await Tweet.findByIdAndUpdate(id,
			{ $pull: { likedUserId: userId } },
			{ new: true, multi: true }
		)
		
		if(!likedTweet) return clientError(res, 'Can not unlike tweet')

		success(res, likedTweet, 'Successfully unliked tweet')
	}
	catch(error) {
		serverError(res)
	}
}

export const updatePinnedTweet = async (req, res) => {
	try {
		const { tweetId, userId } = req.body

		const pinnedTweet = await User.findByIdAndUpdate(userId,
			{ $push: { pinnedTweet: tweetId } },
			{ new: true }
		)
		.populate('pinnedTweet')
		.exec()

		success(res, pinnedTweet, 'Successfully pinned tweet')
	}
	catch(error) {
		serverError(res)
	}
}

export const removePinnedTweet = async (req, res) => {
	try {
		const { tweetId, userId } = req.body

		const pinnedTweet = await User.findByIdAndUpdate(userId,
			{ $pull: { pinnedTweet: tweetId } },
			{ new: true }
		)

		success(res, pinnedTweet, 'Successfully remove pinned tweet')
	}
	catch(error) {
		serverError(res)
	}
}

export const getPinnedTweet = async (req, res) => {
	try {
		const { id } = req.params

		const pinnedTweet = await User.findById({ _id: id })
		.populate('pinnedTweet')
		.exec()

		success(res, pinnedTweet, 'Pinned Tweet Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getBookmarks = async (req, res) => {
	try {
		const { userId } = req.params

		const bookmarks = await User.findById({ _id: userId })
		.populate('bookmark')
		.exec()

		console.log(bookmarks)

		success(res, bookmarks, 'Bookmarks retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const addBookmark = async (req, res) => {
	try {
		const { userId, tweetId } = req.body

		if(!userId || !tweetId) return clientError(res, 'Invalid Credentials')

		await User.findByIdAndUpdate(userId,
			{ $push: { bookmark: tweetId } },
			{ new: true }
		)

		await Tweet.findByIdAndUpdate(tweetId,
			{ $inc: { bookmarkCount: 1 } },
			{ new: true }
		)

		success(res, {}, 'Tweet added to bookmark')
	}
	catch(error) {
		serverError(res)
	}
}

export const removeBookmark = async (req, res) => {
	try {
		const { userId, tweetId } = req.body

		await User.findByIdAndUpdate(userId,
			{ $pull: { bookmark: tweetId } },
			{ new: true }
		)

		await Tweet.findByIdAndUpdate(tweetId,
			{ $inc: { bookmarkCount: -1 } },
			{ new: true }
		)

		success(res, {}, 'Tweet removed to bookmark')
	}
	catch(error) {
		serverError(res)
	}
}

export const followUser = async (req, res) => {
	try {
		const { userId, otherUserId } = req.body

		if(!userId || !otherUserId) return clientError(res, 'Invalid Credentials')

		await User.findByIdAndUpdate(userId,
			{ $push: { following: otherUserId} },
			{ new: true }
		)

		const a = await User.findByIdAndUpdate(otherUserId,
			{ $push: { followers: userId} },
			{ new: true }
		)

		console.log(a)

		success(res, {}, 'Followed User')
	}
	catch(error) {
		serverError(res)
	}
}

export const unfollowUser = async (req, res) => {
	try {
		const { userId, otherUserId } = req.body

		await User.findByIdAndUpdate(userId,
			{ $pull: { following: otherUserId} },
			{ new: true }
		)

		await User.findByIdAndUpdate(otherUserId,
			{ $pull: { followers: userId} },
			{ new: true }
		)

		success(res, {}, 'Unfollowed User')
	}
	catch(error) {
		serverError(res)
	}
}

export const getFollowers = async (req, res) => {
	try {
		const { userId } = req.params

		const followers = await User.findById({ _id: userId })
		.populate('followers')
		.exec()

		success(res, followers, 'Followers Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getFollowing = async (req, res) => {
	try {
		const { userId } = req.params

		const following = await User.findById({ _id: userId })
		.populate('following')
		.exec()

		success(res, following, 'Followers Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getUserByUsername = async (req, res) => {
	try {
		const { username } = req.params

		const currentUser = await User.findOne({ username })

		success(res, currentUser, 'Current User Retrieved')
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
