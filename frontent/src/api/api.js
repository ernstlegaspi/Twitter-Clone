import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001/' })

API.interceptors.request.use(req => {
	if(localStorage.getItem('userInfo')) req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
	
	return req
})

export const addTweet = data => API.post('tweet/', data)
export const getAllTweets = () => API.get('tweet/')

export const loginApi = data => API.post('auth/login', data)
export const register = data => API.post('auth/', data)
