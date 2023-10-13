import Tweet from '../models/tweet.js'
import User from '../models/user.js'

import { badReq, serverError, success } from '../utils/index.js'

export const addTweet = async (req, res) => {
	try {
		const { userId, name, body, username } = req.body

		if(!userId || !name || !body || !username) return badReq(res, 'Invalid credentials')

		const newTweet = new Tweet({ userId, name, username, body })
		const result = await newTweet.save()

		success(res, result, 'Tweets Created' , 201)
	}
	catch(error) {
		serverError(res)
	}
}

export const getTweets = async (req, res) => {
	try {
		const tweets = await Tweet.find().sort({ createdAt: -1 })
		
		success(res, tweets, 'Tweets Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getTweetsByUsername = async (req, res) => {
	try {
		const { username } = req.params

		const tweets = await Tweet.find({ username })

		success(res, tweets, 'Tweets Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}
