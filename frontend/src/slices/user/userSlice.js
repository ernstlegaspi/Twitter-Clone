import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		followers: undefined,
		following: undefined,
		searchedUser: undefined,
		user: undefined
	},
	reducers: {
		setCurrentUser: (state, action) => {
			state.user = action.payload
		},
		setFollowers: (state, action) => {
			state.followers = action.payload
		},
		setFollowing: (state, action) => {
			state.following = action.payload
		},
		setSearchedUser: (state, action) => {
			state.searchedUser = action.payload
		}
	}
})

export const { setCurrentUser, setFollowers, setFollowing, setSearchedUser } = userSlice.actions

export default userSlice.reducer
