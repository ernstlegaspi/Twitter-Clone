import express from 'express'

import { login, register } from '../controllers/auth.js'
import { generateOtp, getCurrentUser, getUserLikedTweets, likeTweet, unlikeTweet, updateUserTweetCount } from '../controllers/user.js'
import { addTweet, getTweets, getSingleTweet, getTweetsByUsername, updateTweetCommentCount, addComment } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* Otp Routes */
router.post('/generateOtp/', generateOtp)

/* Tweet Routes */
router.get('/tweet/', verifyToken, getTweets)
router.get('/tweet/:username', getTweetsByUsername)
router.get('/tweet/singleTweet/:id', getSingleTweet)

router.post('/tweet/', verifyToken, addTweet)
router.post('/tweet/comment', verifyToken, addComment)

router.put('/tweet/', verifyToken, likeTweet)
router.put('/tweet/unlike', verifyToken, unlikeTweet)
// router.put('/tweet/commentCount', verifyToken, updateTweetCommentCount)

/* User Routes */
router.get('/user/:id', verifyToken, getCurrentUser)
router.get('/user/likedTweets/:username', verifyToken, getUserLikedTweets)

router.put('/user/updateTweetCount', verifyToken, updateUserTweetCount)

export default router
