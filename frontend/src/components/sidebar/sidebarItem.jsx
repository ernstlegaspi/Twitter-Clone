import React, { useState, useRef } from 'react'

// import { AiFillBell } from 'react-icons/ai'
import { BsFillHouseDoorFill, BsFillPersonFill } from 'react-icons/bs'
// import { BsFillHouseDoorFill, BsFillPeopleFill, BsFillPersonFill } from 'react-icons/bs'
// import { FaSearch } from 'react-icons/fa'
// import { GrMail } from 'react-icons/gr'
// import { IoMdListBox } from 'react-icons/io'
// import { PiBookmarkSimpleFill } from 'react-icons/pi'

const SidebarItem = ({ onClick, Icon, label, username }) => {
	const [hovered, setHovered] = useState(false)

	const currentIcon = useRef(null)

	const path = window.location.pathname

	if(label === 'Home' && path === '/') {
		currentIcon.current = BsFillHouseDoorFill
	}
	else if(label === 'Profile' && path.split('/')[1] === username) {
		currentIcon.current = BsFillPersonFill
	}

	return (
		<div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="mt-2 w-full cursor-pointer">
			<div className={`${hovered ? 'bg-gray-200' : ''} transition-all rounded-full p-3 pr-6 flex items-center w-max`}>
				{currentIcon.current ? <currentIcon.current size={26} /> : <Icon size={25} />}
				<p className={`ml-4 ${currentIcon.current ? 'mt-1 text-[22px] font-bold' : 'text-xl'}`}>{label}</p>
			</div>
		</div>
	)
}

export default SidebarItem