import React, { useTransition } from 'react'

import { BsThreeDots } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'
import SidebarItem from './sidebarItem'
import { sidebarItems } from '../../constants'

const Sidebar = ({ showPostForm, user }) => {
	// eslint-disable-next-line
	const [_, startTransition] = useTransition()
	const navigate = useNavigate()
	
	return (
		<div className="w-[30.8%] flex justify-end relative">
			<div className="w-[265px] mt-[2px] relative">
				<div className="w-max">
					<Link to="/">
						<div className="hover:bg-gray-200 flex justify-center items-center p-2 rounded-full cursor-pointer">
							<LazyLoadImage className="mt-1" src="/images/logo.webp" alt="X" effect='blur' width={35} height={35} />
						</div>
					</Link>
				</div>
				{sidebarItems.map((item, index) => {
					return(
						<SidebarItem onClick={item.label === 'Profile' ? () => navigate(user.username) : () => {}} key={index} Icon={item.icon} label={item.label} />
					)
				})}
				<button onClick={() => startTransition(() => showPostForm(true))} className="mt-7 font-bold text-white rounded-full purple-button hover:bg-indigo-600 transition-all w-[85%] py-[10px] text-lg">Post</button>
				<div className="cursor-pointer transition-all hover:bg-gray-200 w-[95%] flex items-center rounded-full p-3 absolute bottom-5">
					<p className="bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-3">{user.name.charAt(0)}</p>
					<div className="flex items-center justify-between w-full">
						<div>
							<p className="font-bold">{user.name}</p>
							<p className="homepage-text-color text-[15px]">@{user.username}</p>
						</div>
						<BsThreeDots />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar