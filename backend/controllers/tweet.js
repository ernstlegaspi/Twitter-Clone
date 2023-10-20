import Tweet from '../models/tweet.js'
import User from '../models/user.js'

import { create, getDocuments, getDocument } from './index.js'

import { success, serverError, clientError } from '../utils/index.js'

export const addComment = async (req, res) => {
	try {
		const { tweetId, userId, username, name, body } = req.body

		if(!tweetId || !userId || !username || !name || !body) return clientError(res, 'Invalid credentials')

		let willLoop = true
		let rand = 0
		let document = null
		
		while(willLoop) {
			rand = Math.floor(Math.random() * 1000000000)

			document = await Tweet.find({ uniqueId: rand })

			if(document.length < 1) willLoop = false
		}
		
		const newTweetComment = await new Tweet({ tweetId, username, name, body, userId, uniqueId: rand }).save()

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
		serverError(res)
	}
}

export const addTweet = async (req, res) => {
	try {
		const { id } = req.body

		await User.findOneAndUpdate(id,
			{ $inc: { tweetCount: 1 } },
			{ new: true }
		)

		await create(req, res, Tweet, 'Tweet Created', ['userId', 'username', 'name', 'body'])
	}
	catch(error) {
		serverError(res)
	}
}

export const getTweets = async (req, res) => {
	await getDocuments(res, Tweet, {})
}

export const getNestedComments = async (req, res) => {
	try {
		const nestedComments = await Tweet.find({ nestedComments: { $exists: true, $ne: [] } })
		.populate('nestedComments')
		.exec()

		success(res, nestedComments, 'Nested comments fetched')
	}
	catch(error) {
		serverError(res)
	}
}

export const getTweetsByUsername = async (req, res) => {
	try {
		const { username } = req.params

		const user = await User.findOne({ username })
		.populate('tweets')
		.exec()

		success(res, user, 'Updated Tweet')
	}
	catch(error) {
		serverError(res)
	}
}
 
export const getSingleTweet = async (req, res) => {
	await getDocument(res, Tweet, { uniqueId: req.params.id })
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

export const retweet = async (req, res) => {
	try {
		const { id, userId } = req.body

		const updatedTweet = await Tweet.findByIdAndUpdate(
			id,
			{ $push: { retweetUserId: userId } },
			{ new: true }
		)

		if(!updatedTweet) return serverError(res)

		await User.findByIdAndUpdate(userId,
			{ $push: { tweets: id } },
			{ new: true }
		)
		
		success(res, updatedTweet, 'User Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const addTweetIdToUser = async (req, res) => {
	try {
		const { id, userId } = req.body

		const updatedUser = await User.findByIdAndUpdate(userId,
			{ $push: { tweets: id } },
			{ new: true }
		)

		success(res, updatedUser, 'User Updated')
	}
	catch(error) {
		serverError(res)
	}
}
