import Tweet from '../models/tweet.js'

import { create, getDocuments, getDocument } from './index.js'

import { success, serverError, clientError } from '../utils/index.js'

export const addComment = async (req, res) => {
	try {
		const { tweetId, userId, username, name, body } = req.body

		if(!tweetId || !userId || !username || !name || !body) return clientError(res, 'Invalid credentials')

		const newTweetComment = await new Tweet({ tweetId, username, name, body, userId }).save()

		const newCommentCount = await Tweet.findByIdAndUpdate(tweetId,
			{ $inc: { commentsCount: 1 } },
			{ new: true }
		)

		success(res, { newTweetComment, newCommentCount }, 'Commented')
	}
	catch(error) {
		serverError(res)
	}
}

export const addTweet = async (req, res) => {
	await create(req, res, Tweet, 'Tweet Created', ['userId', 'username', 'name', 'body'])
}

export const getTweets = async (req, res) => {
	try {
		const tweets = await Tweet.find({}).sort({ createdAt: -1 })

		const filteredTweets = tweets.filter(tweet => tweet.tweetId === '')

		success(res, filteredTweets, 'Documents Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getTweetsByUsername = async (req, res) => {
	await getDocuments(res, Tweet, { username: req.params.username })
}

export const getSingleTweet = async (req, res) => {
	await getDocument(res, Tweet, req.params.id)
}

export const getCommentsByTweetId = async (req, res) => {
	await getDocuments(res, Comment, { tweetId: req.params.tweetId })
}

export const updateTweetCommentCount = async (req, res) => {
	try {
		const { id } = req.body

		const tweet = await Tweet.findByIdAndUpdate(id,
			{ $inc: { commentsCount: 1 } },
			{ new: true }
		)

		success(res, tweet, 'Comments count updated')
	}
	catch(error) {
		serverError(res)
	}
}
