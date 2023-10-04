import User from '../models/user.js'
import Tweet from '../models/tweet.js'
import tweet from '../models/tweet.js'

export const getUserLikedTweets = async (req, res) => {
	console.log(11)
	try {
		console.log(22)
		const { username } = req.params
		console.log(33)

		const user = await User.findOne({ username })
		console.log(44)
		const tweets = await Tweet.find({ likedUserId: user._id.toString() })
		console.log(55)

		res.status(200).json({
			success: true,
			result: tweets,
			message: 'Successfully Fetched Liked Tweets'
		})
	}
	catch(error) {
		console.log(66)
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
		console.log("error")
		res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error',
			error
		})
	}
}
