import React from 'react'
import { getConversationsPerCurrentUser, newConversation } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setConversations } from '../../slices/user/userSlice'

const ConfirmationMessageModal = ({ showConfirmationMessageModal, user }) => {
	const currentUser = useSelector(state => state.user.user)
	const dispatch = useDispatch()

	const handleMessageClick = async () => {
		if(!currentUser) return
		
		try {
			await newConversation(currentUser._id,
				{
					name: user?.name,
					username: user?.username
				}
			)

			showConfirmationMessageModal(false)

			const { data } = await getConversationsPerCurrentUser(currentUser?._id)
			
			dispatch(setConversations(data.result.conversations))
		}
		catch(error) {
			toast.error(`Can not message ${user?.name}`)
		}
	}
	
	return (
		<div className="absolute inset-0 z-50 flex justify-center">
			<div className="bg-white shadow-md shadow-black/40 rounded-lg p-3 h-max mt-[50px]">
				<div className="w-full flex items-center mt-3">
					<div onClick={handleMessageClick} className="cursor-pointer rounded text-sm purple-button text-white px-4 py-2 mr-2 hover:bg-violet-700 transition-all">Message <span className="underline">{user?.name}</span></div>
					<div onClick={() => showConfirmationMessageModal(false)} className="cursor-pointer rounded text-sm purple-button text-white px-4 py-2 mr-2 hover:bg-violet-700 transition-all">Cancel</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationMessageModal