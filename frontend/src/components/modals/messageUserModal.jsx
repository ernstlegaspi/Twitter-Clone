import React, { startTransition, useEffect } from 'react'

import { PulseLoader } from 'react-spinners'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import { getUsers } from '../../api/api'
import { setUsers } from '../../slices/user/userSlice'
import UserCard from '../cards/UserCard'

const MessageUserModal = ({ currentUser, showMessageUserModal }) => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.user.users)
	
	useEffect(() => {
		const getAllUsers = async () => {
			const { data } = await getUsers()

			dispatch(setUsers(data.result))
		}

		getAllUsers()
	}, [dispatch])
	
	return (
		<div className="absolute z-50 inset-0 bg-black/50 flex items-center justify-center">
			<div className="bg-white rounded-2xl pt-2 w-[600px] h-[80%]">
				<div className="flex items-center px-2 mb-2">
					<div onClick={() => startTransition(() => showMessageUserModal(false))} className="w-max p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
						<AiOutlineClose size={20} />
					</div>
					<p className="font-bold text-xl ml-3">New message</p>
				</div>
				<div className="w-full h-[93%]">
					{!users ? <div className="w-full pt-10 flex items-center justify-center"><PulseLoader size={10} color="#0EA5E9" /></div> : users.map(user => currentUser._id !== user._id ? <UserCard user={user} /> : null)}
				</div>
			</div>
		</div>
	)
}

export default MessageUserModal