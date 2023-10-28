import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConversationsMessages, setCurrentConvo } from '../../slices/user/userSlice'
import { getConversationMessages } from '../../api/api'

const ConversationCard = ({ isActive, conversation }) => {
	const dispatch = useDispatch()
	const currentUser = useSelector(state => state.user.user)
	const user = useRef(undefined)

	useEffect(() => {
		if(!currentUser) return

		const otherUser = conversation?.users.filter(user => user._id !== currentUser._id)
		
		user.current = otherUser[0]
	}, [currentUser, currentUser?._id, conversation])
	
	return (
		<div onClick={async () => {
			dispatch(setConversationsMessages(undefined))
			dispatch(setCurrentConvo(conversation))

			const { data } = await getConversationMessages(conversation._id)

			dispatch(setConversationsMessages(data.result?.messages))
		}} className={`w-full p-4 transition-all cursor-pointer ${isActive ? 'border-r-2 purple-border bg-gray-200' : 'hover:bg-gray-100'}`}>
			<div className="flex items-center">
				<p className="purple-button rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl">{user.current?.name.charAt(0)}</p>
				<div>
					<div className="flex items-center">
						<p className="cursor-pointer hover:underline font-bold text-[15px] text-gray-700 ml-2">{user.current?.name}</p>
						<p className="cursor-pointer hover:underline text-gray-500 mx-1 text-sm">@{user.current?.username}</p>
					</div>
					{conversation?.lastChat !== '' ? <p className="text-sm text-gray-400 ml-2">{conversation?.lastChat}</p> : <p className="text-[15px] text-gray-500 ml-2">&nbsp;</p>}
				</div>
			</div>
		</div>
	)
}

export default ConversationCard