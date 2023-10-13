import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
	name: 'auth',
	initialState: {
		userInfo: {},
		otp: ''
	},
	reducers: {
		login: (state, action) => {
			state.userInfo = action.payload
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
		},
		logout: (state, action) => {
			state.userInfo = null
			localStorage.removeItem('userInfo')
			localStorage.removeItem('persist:root')
		},
		setOtp: (state, action) => {
			state.otp = action.payload
		}
	}
})

export const { login, logout, setOtp } = auth.actions

export default auth.reducer
