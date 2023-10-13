import express from 'express'

import { login, register } from '../controllers/auth.js'
import { generateOtp, getCurrentUser, getUserLikedTweets, likeTweet, unlikeTweet, updateUserTweetCount } from '../controllers/user.js'
import { addTweet, getTweets, getTweetsByUsername } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* Otp Routes */
router.post('/generateOtp/', generateOtp)

/* User Routes */
router.get('/user/:id', verifyToken, getCurrentUser)
router.get('/user/likedTweets/:username', verifyToken, getUserLikedTweets)
router.put('/user/updateTweetCount', verifyToken, updateUserTweetCount)

/* Tweet Routes */
router.get('/tweet/', verifyToken, getTweets)
router.post('/tweet/', verifyToken, addTweet)
router.put('/tweet/', verifyToken, likeTweet)
router.put('/tweet/unlike', verifyToken, unlikeTweet)
router.get('/tweet/:username', getTweetsByUsername)

export default router
