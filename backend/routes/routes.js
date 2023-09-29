import express from 'express'

import { login, register } from '../controllers/auth.js'
import { getUserLikedPosts } from '../controllers/user.js'
import { addTweet, getTweetsByUserId } from '../controllers/tweet.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* User Routes */
router.get('/user/:username', getUserLikedPosts)

/* Tweet Routes */
router.post('/tweet/', addTweet)
router.get('/tweet/:userId', getTweetsByUserId)


export default router
