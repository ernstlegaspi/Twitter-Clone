import React, { useState } from 'react'

import { AiOutlineEye } from 'react-icons/ai'

const Step5 = ({ setPassword }) => {
	const [isPassword, setIsPassword] = useState(false)
	
	return (
		<>
			<p className="mt-6 text-[33px] font-bold">You'll need a password</p>
			<p className="homepage-text-color">Make sure it's 8 characters or more.</p>
			<div className="mt-7 flex items-center justify-between border border-color px-2 rounded">
				<input onChange={e => setPassword(e.target.value)} type={`${isPassword ? 'text' : 'password'}`} name="password" placeholder="Password" className="py-4 w-full outline-none border-0" />
				<AiOutlineEye onClick={() => setIsPassword(prev => !prev)} className="cursor-pointer" size={22} />
			</div>
		</>
	)
}

export default Step5