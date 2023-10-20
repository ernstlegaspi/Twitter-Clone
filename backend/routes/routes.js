import express from 'express'

import { login, register } from '../controllers/auth.js'
import { generateOtp, getCurrentUser, getUserLikedTweets, likeTweet, unlikeTweet } from '../controllers/user.js'
import { addTweet, getTweets, getSingleTweet, getTweetsByUsername, addComment, getCommentsByTweetId, addNestedComment, getNestedComments, retweet, addTweetIdToUser } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* Otp Routes */
router.post('/generateOtp/', generateOtp)

/* Tweet Routes */
router.get('/retweet/:username', verifyToken, getTweetsByUsername)

router.put('/retweet/update/user', verifyToken, addTweetIdToUser)
router.put('/retweet/', verifyToken, retweet)

router.get('/tweet/', verifyToken, getTweets)
router.get('/tweet/singleTweet/:id', getSingleTweet)
router.get('/tweet/comments/:tweetId', getCommentsByTweetId)
router.get('/tweet/nested/comments', getNestedComments)

router.post('/tweet/', verifyToken, addTweet)
router.post('/tweet/comment', verifyToken, addComment)
router.post('/tweet/nestedComments', verifyToken, addNestedComment)

router.put('/tweet/', verifyToken, likeTweet)
router.put('/tweet/unlike', verifyToken, unlikeTweet)

/* User Routes */
router.get('/user/:id', verifyToken, getCurrentUser)
router.get('/user/likedTweets/:username', verifyToken, getUserLikedTweets)

export default router
