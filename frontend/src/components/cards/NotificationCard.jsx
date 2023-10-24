import React from 'react'

import { AiFillHeart } from 'react-icons/ai'

const NotificationCard = ({ notification }) => {
	return (
		<div className="border-b border-color w-full cursor-pointer hover:bg-gray-100/50 transition-all flex py-3 px-2">
			<AiFillHeart className="text-pink-500 ml-2" size={30} />
			<div className="ml-3 mt-1">
				<p className="bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl">{notification.name.charAt(0)}</p>
				<p className="mt-1 text-[15px]"><span className="font-bold">{notification.name}</span> {notification.message}</p>
				<p className="text-gray-400/80 mt-4 font-semibold">{notification.body}</p>
			</div>
		</div>
	)
}

export default NotificationCard