import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentConvo } from '../../slices/user/userSlice'

const ConversationCard = ({ user, isActive }) => {
	const dispatch = useDispatch()

	return (
		<div onClick={() => {
			dispatch(setCurrentConvo(user))
		}} className={`w-full p-4 transition-all cursor-pointer ${isActive ? 'border-r-2 purple-border bg-gray-200' : 'hover:bg-gray-100'}`}>
			<div className="flex items-center">
				<p className="purple-button rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl">{user?.name.charAt(0)}</p>
				<div>
					<div className="flex items-center">
						<p className="cursor-pointer hover:underline font-bold text-[15px] text-gray-700 ml-2">{user?.name}</p>
						<p className="cursor-pointer hover:underline text-gray-500 mx-1">{user?.username}</p>
					</div>
					<p className="text-[15px] text-gray-500 ml-2">&nbsp;</p>
				</div>
			</div>
		</div>
	)
}

export default ConversationCard