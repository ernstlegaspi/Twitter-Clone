import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		followers: undefined,
		following: undefined,
		searchedUser: undefined,
		user: undefined,
		users: undefined
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
		},
		setUsers: (state, action) => {
			state.users = action.payload
		},
	}
})

export const { setCurrentUser, setFollowers, setFollowing, setSearchedUser, setUsers } = userSlice.actions

export default userSlice.reducer
