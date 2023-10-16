import axios from 'axios'

// const API = axios.create({ baseURL: 'http://192.168.1.4:3001/' })
const API = axios.create({ baseURL: 'http://localhost:3001/' })

API.interceptors.request.use(req => {
	if(localStorage.getItem('userInfo')) req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
	
	return req
})

export const addComment = data => API.post('tweet/comment', data)
export const addTweet = data => API.post('tweet/', data)
export const likeTweet = data => API.put('tweet/', data)
export const unlikeTweet = data => API.put('tweet/unlike', data)
// export const updateTweetCommentCount = id => API.put('tweet/commentCount', id)
export const getAllTweets = () => API.get('tweet/')
export const getSingleTweet = id => API.get(`tweet/singleTweet/${id}`)
export const getTweetsByUsername = username => API.get(`tweet/${username}`)

export const getCurrentUser = id => API.get(`user/${id}`)
export const updateUserTweetCount = id => API.put(`user/updateTweetCount`, id)
export const getUserLikedTweets = username => API.get(`user/likedTweets/${username}`)

export const loginApi = data => API.post('auth/login', data)
export const register = data => API.post('auth/', data)

export const generateOtp = data => API.post('generateOtp/', data)
