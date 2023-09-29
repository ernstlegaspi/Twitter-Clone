import Tweet from '../models/tweet.js'

export const addTweet = async (req, res) => {
	try {
		const { userId, name, body, username } = req.body

		if(!userId || !name || !body || !username) return res.status(400).json({
			success: false,
			result: null,
			message: 'Invalid credentials'
		})

		const newTweet = new Tweet({ userId, name, username, body })
		const result = await newTweet.save()

		res.status(201).json({
			success: true,
			result,
			message: 'Tweet Created'
		})
	}
	catch(error) {
		res.status(500).json({
			success: false,
			result: null,
			error,
			message: 'Internal Server Error'
		})
	}
}

export const getTweetsByUserId = async (req, res) => {
	try {
		const { userId } = req.params

		const tweets = await Tweet.find({ userId })

		res.status(200).json({
			success: true,
			result: tweets,
			message: 'Tweets retrieved'
		})
	}
	catch(error) {
		res.status(500).json({
			success: false,
			result: null,
			error,
			message: 'Internal Server Error'
		})
	}
}
