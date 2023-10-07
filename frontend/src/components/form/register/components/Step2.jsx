import React, { useState } from 'react'

import { AiOutlineCheck } from 'react-icons/ai'

const Step2 = () => {
	const [checked, setChecked] = useState(false)
	
	return (
		<>
			<p className="mt-6 text-[33px] font-bold">Customize your experience</p>
			<p className="mt-6 text-2xl font-semibold">Track where you see X content across the web</p>
			<div className="flex items-start mt-3">
				<p className="leading-5 text-[15px]">X uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.</p>
				<div onClick={() => setChecked(prev => !prev)} className={`flex items-center justify-center cursor-pointer w-[40px] h-[20px] border-2 ${checked ? 'bg-sky-500' : 'border-gray-600'} rounded ${checked ? 'bg-sky-500' : 'bg-white'}`}>
					{checked ? <AiOutlineCheck className="text-white" size={13} /> : null}
				</div>
			</div>
			<p className="mt-7 homepage-text-color text-sm">By signing up, you agree to our <span className="cursor-pointer hover:underline text-sky-500 text-base">Terms</span>, <span className="cursor-pointer hover:underline text-sky-500 text-base">Privacy Policy</span>, and <span className="cursor-pointer hover:underline text-sky-500 text-base">Cookie Use</span>. X may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. <span className="cursor-pointer hover:underline text-sky-500 text-base">Learn more</span></p>
		</>
	)
}

export default Step2