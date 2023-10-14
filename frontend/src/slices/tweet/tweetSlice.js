import { createSlice } from '@reduxjs/toolkit'

const tweet = createSlice({
	name: 'Tweet',
	initialState: {
		tweets: undefined,
		tweet: undefined,
		postForm: false
	},
	reducers: {
		setTweet: (state, action) => {
			state.tweet = action.payload
		},
		setTweets: (state, action) => {
			state.tweets = action.payload
		}
	}
})

export const { setTweet, setTweets } = tweet.actions

export default tweet.reducer
