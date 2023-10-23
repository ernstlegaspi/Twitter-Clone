import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001/' })

API.interceptors.request.use(req => {
	if(localStorage.getItem('userInfo')) req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
	
	return req
})

export const deleteTweet = data => API.post('deleteTweet/', data)
export const pinnedTweet = data => API.put('pinnedTweet/', data)
export const removePinnedTweet = data => API.put('pinnedTweetRemove/', data)
export const getPinnedTweet = tweetId => API.get(`pinnedTweet/${tweetId}`)
export const retweet = data => API.put('retweet/', data)
export const undoRetweet = data => API.put('retweet/undo/retweet', data)
export const addTweetIdToUser = data => API.put('retweet/update/user', data)
export const getTweetsByUsername = id => API.get(`retweet/${id}`)

export const addComment = data => API.post('tweet/comment', data)
export const addNestedComment = data => API.post('tweet/nestedComments', data)
export const getNestedComments = () => API.get('tweet/nested/comments')
export const getCommentsByTweetId = tweetId => API.get(`tweet/comments/${tweetId}`)

export const addTweet = data => API.post('tweet/', data)
export const likeTweet = data => API.put('tweet/', data)
export const unlikeTweet = data => API.put('tweet/unlike', data)
export const getAllTweets = () => API.get('tweet/')
export const getSingleTweet = id => API.get(`tweet/singleTweet/${id}`)

export const addNotification = (userId, data) => API.post(`newNotification/${userId}`, data)
export const getNotificationCount = userId => API.get(`getNotificationCount/${userId}`)
export const updateNotificationCount = userId => API.put('updateNotificationCount/', userId)
export const getNotifications = id => API.get(`getNotification/${id}`)

export const getCurrentUser = id => API.get(`user/${id}`)
export const getUserLikedTweets = username => API.get(`user/likedTweets/${username}`)

export const loginApi = data => API.post('auth/login', data)
export const register = data => API.post('auth/', data)

export const generateOtp = data => API.post('generateOtp/', data)
