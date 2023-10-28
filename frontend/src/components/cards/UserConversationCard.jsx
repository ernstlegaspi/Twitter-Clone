import React from 'react'

import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

const UserConversationCard = () => {
	const currentConvoUser = useSelector(state => state.user.currentConvo)
	const navigate = useNavigate()

	return (
		<div>
			{!currentConvoUser ? <PulseLoader size={10} color="#0EA5E9" /> : <div className="p-2">
				<div className="w-full flex items-center justify-between">
					<div className="flex items-center ">
						<p onClick={() => navigate(`/${currentConvoUser?.username}/`)} className="mr-2 cursor-pointer purple-button rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl">{currentConvoUser?.name.charAt(0)}</p>
						<div>
							<p onClick={() => navigate(`/${currentConvoUser?.username}/`)} className="cursor-pointer hover:underline font-bold text-lg text-gray-700">{currentConvoUser?.name}</p>
							<p onClick={() => navigate(`/${currentConvoUser?.username}/`)} className="cursor-pointer hover:underline text-sm text-gray-500 mt-[-3px]">@{currentConvoUser?.username}</p>
						</div>
					</div>
					<div onClick={() => {}} className="w-max p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
						<AiOutlineExclamationCircle size={20} />
					</div>
				</div>
			</div>}
		</div>
	)
}

export default UserConversationCard