import React from 'react'

const UserCard = ({ user }) => {
	return (
		<div className="border-b border-color w-full cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
			<div className="flex items-center px-2 py-3">
				<p className="purple-button rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-3">{user?.name.charAt(0)}</p>
				<div>
					<p className="font-semibold text-lg">{user?.name}</p>
					<p className="mt-[-5px] ml-[-1px] text-gray-500 text-sm font-semibold">@{user?.username}</p>
				</div>
			</div>
			<div className="rounded-full text-sm purple-button text-white px-4 py-2 mr-2 hover:bg-violet-700 transition-all">Message  <span className="underline">{user?.name}</span></div>
		</div>
	)
}

export default UserCard