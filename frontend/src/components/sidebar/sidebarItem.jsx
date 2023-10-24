import React, { useState, useRef } from 'react'

import { BsFillBookmarkFill, BsFillHouseDoorFill, BsFillPersonFill } from 'react-icons/bs'
import { RiNotification2Fill } from 'react-icons/ri'

const SidebarItem = ({ onClick, Icon, label, username, notificationCount = 0 }) => {
	const [hovered, setHovered] = useState(false)
	const isActive = useRef(false)

	const currentIcon = useRef(null)
	const defIcon = useRef(Icon)

	const path = window.location.pathname

	const changeIcon = (condition, newIcon) => {
		currentIcon.current = condition ? newIcon : defIcon.current
		isActive.current = condition
	}

	if(!path.includes('status/')) {
		switch(label) {
			case 'Home':
				changeIcon(path === '/', BsFillHouseDoorFill)

				break
			case 'Profile':
				changeIcon(path.split('/')[1] === username, BsFillPersonFill)

				break
			case 'Notifications':
				changeIcon(path.split('/')[1] === 'notifications', RiNotification2Fill)
				
				break
			case 'Bookmarks':
				changeIcon(path.split('/')[1] === 'bookmarks', BsFillBookmarkFill)
				
				break
			default:
				break
		}
	}

	return (
		<div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="mt-2 w-full cursor-pointer">
			<div className={`${hovered ? 'bg-gray-200' : ''} transition-all rounded-full p-3 pr-6 flex items-center w-max`}>
				{isActive.current ? <currentIcon.current size={26} /> : (
					<div>
						{notificationCount > 0 ? <div className="absolute bg-indigo-600 text-white text-[11px] rounded-full flex items-center justify-center w-[14px] h-[14px] mt-[-10px] ml-5">
							<p className="mt-[1px] ml-[-1px]">{notificationCount}</p>
						</div> : null}
						<Icon size={25} />
					</div>
				)}
				<p className={`ml-4 ${isActive.current ? 'mt-1 text-[22px] font-bold' : 'text-xl'}`}>{label}</p>
			</div>
		</div>
	)
}

export default SidebarItem