import { createSlice } from '@reduxjs/toolkit'

const tweet = createSlice({
	name: 'Tweet',
	initialState: {
		comments: undefined,
		tweets: undefined,
		tweet: undefined,
		postForm: false
	},
	reducers: {
		setComment: (state, action) => {
			state.comments = action.payload
		},
		setTweet: (state, action) => {
			state.tweet = action.payload
		},
		setTweets: (state, action) => {
			state.tweets = action.payload
		}
	}
})

export const { setComment, setTweet, setTweets } = tweet.actions

export default tweet.reducer
