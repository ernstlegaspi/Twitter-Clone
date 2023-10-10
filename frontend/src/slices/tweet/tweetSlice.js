import { createSlice } from '@reduxjs/toolkit'

const tweet = createSlice({
	name: 'Tweet',
	initialState: {
		tweets: {},
		postForm: false,
	},
	reducers: {
		setTweet: (state, action) => {
			state.tweets = action.payload
		}
	}
})

export const { setTweet } = tweet.actions

export default tweet.reducer
