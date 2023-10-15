import express from 'express'

import { login, register } from '../controllers/auth.js'
import { generateOtp, getCurrentUser, getUserLikedTweets, likeTweet, unlikeTweet, updateUserTweetCount } from '../controllers/user.js'
import { addComment, getCommentsByTweetId, getUserComments } from '../controllers/comment.js'
import { addTweet, getTweets, getSingleTweet, getTweetsByUsername } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* Comment Routes */
router.get('/comment/', getUserComments)
router.get('/comment/:tweetId', getCommentsByTweetId)
router.post('/comment/', verifyToken, addComment)

/* Otp Routes */
router.post('/generateOtp/', generateOtp)

/* Tweet Routes */
router.get('/tweet/', verifyToken, getTweets)
router.post('/tweet/', verifyToken, addTweet)
router.put('/tweet/', verifyToken, likeTweet)
router.put('/tweet/unlike', verifyToken, unlikeTweet)
router.get('/tweet/:username', getTweetsByUsername)
router.get('/tweet/singleTweet/:id', getSingleTweet)

/* User Routes */
router.get('/user/:id', verifyToken, getCurrentUser)
router.get('/user/likedTweets/:username', verifyToken, getUserLikedTweets)
router.put('/user/updateTweetCount', verifyToken, updateUserTweetCount)

export default router
