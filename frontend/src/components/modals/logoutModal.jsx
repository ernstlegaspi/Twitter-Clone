import React from 'react'

import { useDispatch } from 'react-redux'

import { logout } from '../../slices/auth/authSlice'

const LogoutModal = ({ showLogoutModal }) => {
	const dispatch = useDispatch()
	
	const handleLogout = () => {
		dispatch(logout())
		window.location.reload()
	}
	
	return (
		<div className="absolute bg-black/40 inset-0 flex items-center justify-center">
			<div className="w-[500px] h-[100px] bg-white rounded-lg p-3">
				<p>Are you sure you want to logout?</p>
				<div className="flex items-end w-full h-[75%]">
					<button onClick={handleLogout} className="w-1/2 bg-indigo-500 rounded py-2 text-white mr-2 transition-all hover:bg-indigo-700">Logout</button>
					<button onClick={() => showLogoutModal(false)} className="w-1/2 rounded py-2 transition-all hover:bg-gray-200 border border-color">Cancel</button>
				</div>
			</div>
		</div>
	)
}

export default LogoutModal