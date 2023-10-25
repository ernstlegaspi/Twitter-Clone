import React from 'react'

import { FiSettings } from 'react-icons/fi'

const MessagePage = ({ showMessageUserModal }) => {
	const Header = () => <div className="w-full flex items-center justify-between p-2 pl-4 pr-3">
		<p className="font-semibold text-xl">Messages</p>
		<div className="cursor-pointer rounded-full p-2 hover:bg-gray-200/70 transition-all">
			<FiSettings size={18} />
		</div>
	</div>

	const guideSection = (text1, text2, buttonText, onClick) => <>
		<p className="font-bold text-[32px]">{text1}</p>
		<p className="text-[15px] text-slate-500">{text2}</p>
		<div onClick={onClick} className="mt-[25px] purple-button rounded-full w-max px-9 py-4 text-white font-bold cursor-pointer hover:bg-violet-800 transition-all">{buttonText}</div>
	</>
	
	return (
		<div className="flex">
			<div className="border-l border-r border-color w-[395px]">
				<Header />
				<div className="w-[80%] mx-auto mt-[30px]">
					{guideSection('Welcome to your inbox!', 'Drop a line, share posts and more with private conversations between you and others on X.', 'Write a message', () => showMessageUserModal(true))}
				</div>
			</div>
			<div className="border-r border-color w-[600px]">
				<div className="w-[60%] mx-auto top-[50%] relative translate-y-[-50%]">
					{guideSection('Select a message', 'Choose from your existing conversations, start a new one, or just keep swimming.', 'New message', () => showMessageUserModal(true))}
				</div>
			</div>
		</div>
	)
}

export default MessagePage