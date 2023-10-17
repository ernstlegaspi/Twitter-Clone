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

export const addNestedComment = async (req, res) => {
	try {
		const { id, nestedCommentId } = req.body

		const newNestedComment = await Tweet.findByIdAndUpdate(id,
			{ $push: { nestedComments: nestedCommentId } },
			{ new: true }
		)

		success(res, newNestedComment, 'Added nested comment')
	}
	catch(error) {
		console.log('eroror')
		serverError(res)
	}
}

export const addTweet = async (req, res) => {
	await create(req, res, Tweet, 'Tweet Created', ['userId', 'username', 'name', 'body'])
}

export const getTweets = async (req, res) => {
	await getDocuments(res, Tweet, {})
}

export const getLastNestedComment = async (req, res) => {
	try {
		const { id } = req.params

		const nestedComments = await Tweet.findOne({ _id: id }).sort({ createdAt: -1 })
		.populate('nestedComments')
		.exec()

		success(res, nestedComments.nestedComments[nestedComments.nestedComments.length - 1], 'Nested comments fetched')
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
	try {
		const comments = await Tweet.find({ tweetId: req.params.tweetId })

		success(res, comments, 'Comments Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}
