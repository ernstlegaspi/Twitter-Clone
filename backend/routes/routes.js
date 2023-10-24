import express from 'express'

import { login, register } from '../controllers/auth.js'

import { generateOtp, getCurrentUser, getPinnedTweet, getUserLikedTweets, likeTweet, updatePinnedTweet, unlikeTweet, removePinnedTweet, addBookmark, removeBookmark, getBookmarks, getFollowers, getFollowing, followUser, unfollowUser, getUserByUsername } from '../controllers/user.js'

import { addTweet, getTweets, getSingleTweet, getTweetsByUsername, addComment, getCommentsByTweetId, addNestedComment, getNestedComments, retweet, addTweetIdToUser, undoRetweet, deleteTweet } from '../controllers/tweet.js'

import { verifyToken } from '../middleware/auth.js'
import { addNotification, getNotificationByUser, getNotificationCount, updateNotificationCount } from '../controllers/notification.js'

const router = express.Router()

/* Auth Routes */
router.post('/auth/', register)
router.post('/auth/login', login)

/* Otp Routes */
router.post('/generateOtp/', generateOtp)

/* Tweet Routes */
router.get('/getBookmarks/:userId', verifyToken, getBookmarks)
router.put('/addBookmark/', verifyToken, addBookmark)
router.put('/removeBookmark/', verifyToken, removeBookmark)

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

/* Notification Routes */
router.get('/getNotificationCount/:userId', verifyToken, getNotificationCount)
router.get('/getNotification/:userId', verifyToken, getNotificationByUser)

router.post('/newNotification/:userId', verifyToken, addNotification)

router.put('/updateNotificationCount/', verifyToken, updateNotificationCount)

/* User Routes */
router.get('/userByUsername/:username', verifyToken, getUserByUsername)
router.get('/user/:id', verifyToken, getCurrentUser)
router.get('/user/likedTweets/:username', verifyToken, getUserLikedTweets)

router.get('/getFollowers/:userId', verifyToken, getFollowers)
router.get('/getFollowing/:userId', verifyToken, getFollowing)

router.put('/followUser/', verifyToken, followUser)
router.put('/unfollowUser/', verifyToken, unfollowUser)

export default router
