import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
	name: 'auth',
	initialState: {
		userInfo: {}
	},
	reducers: {
		login: (state, action) => {
			state.userInfo = action.payload
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
		},
		logout: (state, action) => {
			state.userInfo = null
			localStorage.removeItem('userInfo')
		}
	}
})

export const { login, logout } = auth.actions

export default auth.reducer
