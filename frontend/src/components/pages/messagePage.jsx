import React, { useEffect } from 'react'

import { FiSettings } from 'react-icons/fi'
import { LuMailPlus } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { getConversationsPerCurrentUser } from '../../api/api'
import { setConversations } from '../../slices/user/userSlice'
import ConversationCard from '../cards/ConversationCard'
import UserConversationCard from '../cards/UserConversationCard'

const MessagePage = ({ showMessageUserModal, user }) => {
	const conversations = useSelector(state => state.user.conversations)
	const currentConvo = useSelector(state => state.user.currentConvo)
	const dispatch = useDispatch()

	useEffect(() => {
		if(!user) return
		
		const getAllUserConversations = async () => {
			const { data } = await getConversationsPerCurrentUser(user?._id)
			
			dispatch(setConversations(data.result.conversations))
		}

		getAllUserConversations()
	}, [dispatch, user?._id, user])
	
	const Header = () => <div className="w-full flex items-center justify-between p-2 pl-4 pr-3">
		<p className="font-semibold text-xl">Messages</p>
		<div className="flex items-center">
			<div className="cursor-pointer rounded-full p-2 hover:bg-gray-200/70 transition-all">
				<FiSettings size={18} />
			</div>
			<div onClick={() => showMessageUserModal(true)} className="cursor-pointer rounded-full p-2 hover:bg-gray-200/70 transition-all">
				<LuMailPlus size={18} />
			</div>
		</div>
	</div>

	const guideSection = (text1, text2, buttonText, onClick, hasButton = true) => <>
		<p className="font-bold text-[32px]">{text1}</p>
		<p className="text-[15px] text-slate-500">{text2}</p>
		{hasButton ? <div onClick={onClick} className="mt-[25px] purple-button rounded-full w-max px-9 py-4 text-white font-bold cursor-pointer hover:bg-violet-800 transition-all">{buttonText}</div> : null}
	</>
	
	return (
		<div className="flex h-full">
			<div className="border-l border-r border-color w-[395px]">
				<Header />
				{!conversations || conversations?.length < 1 ? <div className="w-[80%] mx-auto mt-[30px]">
					{guideSection('Welcome to your inbox!', 'Drop a line, share posts and more with private conversations between you and others on X.', 'Write a message', () => showMessageUserModal(true))}
				</div> : conversations.map(conversation => <ConversationCard key={conversation?._id} conversation={conversation} />)}
			</div>
			<div className="border-r border-color w-[600px] h-full">
				{!conversations || conversations?.length < 1 ? <div className="w-[60%] mx-auto top-[50%] relative translate-y-[-50%]">
					{guideSection('Select a message', 'Choose from your existing conversations, start a new one, or just keep swimming.', 'New message', () => showMessageUserModal(true))}
				</div> : !currentConvo ? <div className="w-[60%] mx-auto top-[50%] relative translate-y-[-50%]">
					{guideSection('Select a conversation', 'Choose from your existing conversations, start a new one, or just keep swimming.', '', () => {}, false)}
				</div> : <UserConversationCard />}
			</div>
		</div>
	)
}

export default MessagePage