import User from '../models/user.js'
import Tweet from '../models/tweet.js'

export const getUserLikedPosts = async (req, res) => {
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
