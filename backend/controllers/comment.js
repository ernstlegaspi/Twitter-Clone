import Comment from "../models/comment.js"

import { create, getDocuments } from "./index.js"

export const addComment = async (req, res) => {
	await create(req, res, Comment, 'Comment Created', ['tweetId', 'userId', 'name', 'username', 'body'])
}

export const getUserComments = async (req, res) => {
	await getDocuments(res, Comment, {})
}

export const getCommentsByTweetId = async (req, res) => {
	await getDocuments(res, Comment, { _id: req.params.tweetId })
}
