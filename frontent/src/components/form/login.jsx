import React from 'react'

import { Formik } from 'formik'

const Login = () => {
	return (
		<Formik>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
				<form onSubmit={handleSubmit}>
					<input type="email" placeholder="Email" name="email" onChange={handleChange} /> <br /> <br />
					<input type="password" placeholder="Password" name="password" onChange={handleChange} /> <br /> <br />
					<button type="submit">Login</button>
				</form>
			)}
		</Formik>
	)
}

export default Login