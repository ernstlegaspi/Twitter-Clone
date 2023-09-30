import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { login } from '../../slices/auth/authSlice'
import { register } from '../../api/api'

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
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Name" name="name" onChange={e => handleFormData(e)} /> <br /><br />
			<input type="email" placeholder="Email" name="email" onChange={e => handleFormData(e)} /> <br /> <br />
			<input type="password" placeholder="Password" name="password" onChange={e => handleFormData(e)} /> <br /> <br />
			<button type="submit">Register</button>
		</form>
	)
}

export default RegisterForm