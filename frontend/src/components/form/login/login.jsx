import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { login } from '../../../slices/auth/authSlice'
import { loginApi } from '../../../api/api'

const LoginForm = () => {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({ email: '', password: '' })

	const handleSubmit = async e => {
		e.preventDefault()
		
		try {
			const { data } = await loginApi({ ...formData })
			dispatch(login(data.result))
			window.location.reload()
		}
		catch(error) {
			alert(`Error logging in ${error}`)
		}
	}
	
	const handleFormData = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	return (
		<form onSubmit={handleSubmit}>
			<input type="email" placeholder="Email" name="email" onChange={e => handleFormData(e)} /> <br /> <br />
			<input type="password" placeholder="Password" name="password" onChange={e => handleFormData(e)} /> <br /> <br />
			<button type="submit">Login</button>
		</form>
	)
}

export default LoginForm