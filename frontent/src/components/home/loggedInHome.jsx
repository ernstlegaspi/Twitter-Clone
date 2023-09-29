import React from 'react'

import { useDispatch } from 'react-redux'
import { logout } from '../../slices/auth/authSlice'

const LoggedInHome = () => {
	const dispatch = useDispatch()
	
	const handleLogout = () => {
		dispatch(logout())
		window.location.reload()
	}
	
	return (
		<>
			<div>LoggedInHome</div>
			<button onClick={handleLogout}>Logout</button>
		</>
	)
}

export default LoggedInHome