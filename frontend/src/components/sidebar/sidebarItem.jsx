import React, { useState } from 'react'

const SidebarItem = ({ onClick, Icon, label }) => {
	const [hovered, setHovered] = useState(false)

	return (
		<div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="mt-2 w-full cursor-pointer">
			<div className={`${hovered ? 'bg-gray-200' : ''} transition-all rounded-full p-3 pr-6 flex items-center w-max`}>
				<Icon size={25} />
				<p className="ml-4 text-xl">{label}</p>
			</div>
		</div>
	)
}

export default SidebarItem