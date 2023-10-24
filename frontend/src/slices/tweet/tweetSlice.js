import { createSlice } from '@reduxjs/toolkit'

const tweet = createSlice({
	name: 'Tweet',
	initialState: {
		bookmarks: undefined,
		comments: undefined,
		nestedComments: undefined,
		pinnedTweet: undefined,
		tweets: undefined,
		tweet: undefined,
		postForm: false
	},
	reducers: {
		setBookmark: (state, action) => {
			state.bookmarks = action.payload
		},
		setComment: (state, action) => {
			state.comments = action.payload
		},
		setNestedComments: (state, action) => {
			state.nestedComments = action.payload
		},
		setPinnedTweet: (state, action) => {
			state.pinnedTweet = action.payload
		},
		setTweet: (state, action) => {
			state.tweet = action.payload
		},
		setTweets: (state, action) => {
			state.tweets = action.payload
		}
	}
})

export const { setBookmark, setComment, setNestedComments, setPinnedTweet, setTweet, setTweets } = tweet.actions

export default tweet.reducer
