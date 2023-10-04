import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { login } from '../../slices/auth/authSlice'
import { register } from '../../api/api'

import { AiOutlineClose } from 'react-icons/ai'

const RegisterForm = () => {
	const [formData, setFormData] = useState({ name: '', email: '', password: '' })
	const dispatch = useDispatch()
	
	const handleSubmit = async e => {
		e.preventDefault()
		
		try {
			const { data } = await register({ ...formData })
			dispatch(login(data.result))
			window.location.reload()
		}
		catch(error) {
			alert(`Can not register ${error}`)
		}
	}

	const handleFormData = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	return (
		<>
			<div className="bg-white h-[650px] w-[600px] rounded-[15px] pt-2 pl-2">
				<div className="flex">
					<div className="hover:bg-gray-200 rounded-full p-2 w-max">
						<AiOutlineClose size={19} />
					</div>
					<div className="ml-7">
						<p className="text-xl font-bold mt-[2px]">Step 1 of 5</p>
						<p className="mt-6 text-[33px] font-bold">Create your account</p>
						<input type="text" placeholder="Name" className="border border-gray-300" />
					</div>
				</div>
			</div>
		</>
		// <form onSubmit={handleSubmit}>
		// 	<input type="text" placeholder="Name" name="name" onChange={e => handleFormData(e)} /> <br /><br />
		// 	<input type="email" placeholder="Email" name="email" onChange={e => handleFormData(e)} /> <br /> <br />
		// 	<input type="password" placeholder="Password" name="password" onChange={e => handleFormData(e)} /> <br /> <br />
		// 	<button type="submit">Register</button>
		// </form>
	)
}

export default RegisterForm