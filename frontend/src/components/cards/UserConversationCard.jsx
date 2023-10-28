import React, { useEffect, useState } from 'react'

import { AiOutlineExclamationCircle, AiOutlineSend } from 'react-icons/ai'
import { BsCardImage, BsEmojiSmile, BsFiletypeGif } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { getConversationMessages, newMessage } from '../../api/api'
import toast from 'react-hot-toast'
import { setConversationsMessages } from '../../slices/user/userSlice'

const UserConversationCard = () => {
	const currentConvo = useSelector(state => state.user.currentConvo)
	const messages = useSelector(state => state.user.conversationMessages)
	const currentUser = useSelector(state => state.user.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [otherUser, setOtherUser] = useState(undefined)
	const [disabled, setDisabled] = useState(false)
	const [messagesLoading, setMessagesLoading] = useState(false)
	const [body, setBody] = useState('')

	const icons = Icon => <div className="rounded-full w-max hover:bg-gray-300 cursor-pointer transition-all purple-text p-2">
		<Icon size={18} />
	</div>
	
	const handleSendMessage = async () => {
		try {
			await newMessage(currentConvo._id,
				{
					body,
					userId: currentUser._id
				}
			)

			setDisabled(true)
			setBody('')

			const { data } = await getConversationMessages(currentConvo._id)

			dispatch(setConversationsMessages(data.result?.messages))
		}
		catch(e) {
			toast.error('Error sending a message')
			setDisabled(true)
			setBody('')
		}
	}

	useEffect(() => {
		if(!currentUser) return
		
		setMessagesLoading(true)

		const _otherUser = currentConvo?.users.filter(user => user?._id !== currentUser?._id)

		setOtherUser(_otherUser[0])
		
		const getAllConversationMessages = async () => {
			const { data } = await getConversationMessages(currentConvo._id)

			dispatch(setConversationsMessages(data.result?.messages))
		}

		getAllConversationMessages()
		setMessagesLoading(false)
	}, [dispatch, currentUser, currentConvo?._id, currentConvo?.users, otherUser, messagesLoading, currentUser?._id])
	
	return (
		<div className="h-full">
			{!otherUser ? <PulseLoader size={10} color="#0EA5E9" /> : <div className="w-full h-full">
				<div className="w-full flex items-center justify-between px-2 py-2 border-b border-color">
					<div className="flex items-center ">
						<p onClick={() => navigate(`/${otherUser?.username}/`)} className="mr-2 cursor-pointer purple-button rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl">{otherUser?.name.charAt(0)}</p>
						<div>
							<p onClick={() => navigate(`/${otherUser?.username}/`)} className="cursor-pointer hover:underline font-bold text-lg text-gray-700">{otherUser?.name}</p>
							<p onClick={() => navigate(`/${otherUser?.username}/`)} className="cursor-pointer hover:underline text-sm text-gray-500 mt-[-3px]">@{otherUser?.username}</p>
						</div>
					</div>
					<div onClick={() => {}} className="w-max p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
						<AiOutlineExclamationCircle size={20} />
					</div>
				</div>
				<div className="w-full h-[93%] flex flex-col justify-between">
					<div className="px-2 pt-3">
						{messagesLoading || !messages ? <div className="w-full flex justify-center mt-[100px]"><PulseLoader size={10} color="#0EA5E9" /></div> : messages.map(message => <div key={message._id} className={`w-full mb-2 ${message.userId === currentUser._id ? 'flex justify-end' : ''}`}>
							<p className={`${message.userId === currentUser._id ? 'purple-button text-white' : 'input-color text-black'} rounded-full p-2 px-4 w-max text-[15px]`}>{message.body}</p>
						</div>)}
					</div>
					<div className="border-t border-color w-full pt-3 pb-2 px-4">
						<div className="py-1 w-full flex items-center justify-between rounded-xl input-color px-2">
							<div className="flex items-center w-full">
								<div className="flex items-center justify-between mr-1">
									{icons(BsCardImage)}
									{icons(BsFiletypeGif)}
									{icons(BsEmojiSmile)}
								</div>
								<input value={body} onChange={e => {
									setBody(e.target.value)
									setDisabled(e.target.value === '')
								}} type="text" placeholder="Start a new message" className="outline-none w-[78%] bg-transparent" />
							</div>
							<AiOutlineSend onClick={disabled ? null : () => handleSendMessage()} className={`${disabled ? 'purple-text-disabled' : 'cursor-pointer purple-text'}`} size={20} />
						</div>
					</div>
				</div>
			</div>}
		</div>
	)
}

export default UserConversationCard