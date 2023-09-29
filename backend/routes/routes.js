import express from 'express'

import { login, register } from '../controllers/auth.js'
import { getUserLikedPosts } from '../controllers/user.js'
import { addTweet, getTweets, getTweetsByUserId } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* User Routes */
router.get('/user/:username', verifyToken, getUserLikedPosts)

/* Tweet Routes */
router.get('/tweet/', verifyToken, getTweets)
router.get('/tweet/:userId', verifyToken, getTweetsByUserId)
router.post('/tweet/', verifyToken, addTweet)


export default router
