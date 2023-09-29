import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { useAuthLoginMutation } from '../../slices/auth/authEndpoints'
import { login } from '../../slices/auth/authSlice'

const LoginForm = () => {
	const [authLogin] = useAuthLoginMutation()
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({ email: '', password: '' })

	const handleSubmit = async e => {
		e.preventDefault()
		
		try {
			const res = await authLogin({ ...formData }).unwrap()
			dispatch(login({ ...res }))
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