import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		notification: undefined,
		notificationCount: 0
	},
	reducers: {
		setNotifications: (state, action) => {
			state.notification = action.payload
		},
		setNotificationCount: (state, action) => {
			state.notificationCount = action.payload
		}
	}
})

export const { setNotifications, setNotificationCount } = notificationSlice.actions

export default notificationSlice.reducer
