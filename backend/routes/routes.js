import express from 'express'

import { login, register } from '../controllers/auth.js'
import { getUserLikedPosts } from '../controllers/user.js'
import { addTweet, getTweets, getTweetsByUsername } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* User Routes */
router.get('/user/:username', verifyToken, getUserLikedPosts)

/* Tweet Routes */
router.get('/tweet/', verifyToken, getTweets)
router.post('/tweet/', verifyToken, addTweet)
router.get('/tweet/:username', verifyToken, getTweetsByUsername)


export default router
