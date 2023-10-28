import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		conversations: undefined,
		conversationMessages: undefined,
		currentConvo: undefined,
		followers: undefined,
		following: undefined,
		searchedUser: undefined,
		user: undefined,
		users: undefined
	},
	reducers: {
		setConversations: (state, action) => {
			state.conversations = action.payload
		},
		setConversationsMessages: (state, action) => {
			state.conversationMessages = action.payload
		},
		setCurrentConvo: (state, action) => {
			state.currentConvo = action.payload
		},
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
		}
	}
})

export const { setConversations, setConversationsMessages, setCurrentConvo, setCurrentUser, setFollowers, setFollowing, setSearchedUser, setUsers } = userSlice.actions

export default userSlice.reducer
