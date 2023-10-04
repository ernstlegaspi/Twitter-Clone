import express from 'express'

import { login, register } from '../controllers/auth.js'
import { getUserLikedTweets, likeTweet } from '../controllers/user.js'
import { addTweet, getTweets, getTweetsByUsername } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* User Routes */
router.get('/user/:username', verifyToken, getUserLikedTweets)

/* Tweet Routes */
router.get('/tweet/', verifyToken, getTweets)
router.post('/tweet/', verifyToken, addTweet)
router.put('/tweet/', verifyToken, likeTweet)
router.get('/tweet/:username', verifyToken, getTweetsByUsername)


export default router
