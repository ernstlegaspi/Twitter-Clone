import Tweet from '../models/tweet.js'

import { create, getDocuments, getDocument } from './index.js'

export const addTweet = async (req, res) => {
	await create(req, res, Tweet, 'Tweet Created', ['userId', 'username', 'name', 'body'])
}

export const getTweets = async (req, res) => {
	await getDocuments(res, Tweet, {})
}

export const getTweetsByUsername = async (req, res) => {
	await getDocuments(res, Tweet, { username: req.params.username })
}

export const getSingleTweet = async (req, res) => {
	await getDocument(res, Tweet, req.params.id)
}
