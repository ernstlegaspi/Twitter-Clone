import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001/' })

API.interceptors.request.use(req => {
	if(localStorage.getItem('userInfo')) req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
	
	return req
})

export const addBookmark = data => API.put('addBookmark/', data)
export const getBookmarks = userId => API.get(`getBookmarks/${userId}`)
export const removeBookmark = data => API.put('removeBookmark/', data)

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
export const getUserByUsername = username => API.get(`userByUsername/${username}`)
export const getUserLikedTweets = username => API.get(`user/likedTweets/${username}`)

export const getUsers = () => API.get('getUsers/')

export const getFollowers = userId => API.get(`getFollowers/${userId}`)
export const getFollowing = userId => API.get(`getFollowing/${userId}`)

export const followUser = data => API.put('followUser', data)
export const unfollowUser = data => API.put('unfollowUser', data)

export const loginApi = data => API.post('auth/login', data)
export const register = data => API.post('auth/', data)

export const newConversation = data => API.post(`newConversation/`, data)
export const newMessage = (conversationId, data) => API.post(`newMessage/${conversationId}`, data)

export const getConversationsPerCurrentUser = userId => API.get(`getConversationsPerCurrentUser/${userId}`)
export const getConversationMessages = conversationId => API.get(`getConversationMessages/${conversationId}`)

export const generateOtp = data => API.post('generateOtp/', data)
