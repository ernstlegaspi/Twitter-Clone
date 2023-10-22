import express from 'express'

import { login, register } from '../controllers/auth.js'
import { generateOtp, getCurrentUser, getPinnedTweet, getUserLikedTweets, likeTweet, updatePinnedTweet, unlikeTweet, removePinnedTweet } from '../controllers/user.js'
import { addTweet, getTweets, getSingleTweet, getTweetsByUsername, addComment, getCommentsByTweetId, addNestedComment, getNestedComments, retweet, addTweetIdToUser, undoRetweet, deleteTweet } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* Otp Routes */
router.post('/generateOtp/', generateOtp)

/* Tweet Routes */
router.post('/deleteTweet/', verifyToken, deleteTweet)

router.put('/pinnedTweet/', verifyToken, updatePinnedTweet)
router.put('/pinnedTweetRemove/', verifyToken, removePinnedTweet)
router.get('/pinnedTweet/:id', verifyToken, getPinnedTweet)

router.get('/retweet/:username', verifyToken, getTweetsByUsername)

router.put('/retweet/update/user', verifyToken, addTweetIdToUser)
router.put('/retweet/', verifyToken, retweet)
router.put('/retweet/undo/retweet', verifyToken, undoRetweet)

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
