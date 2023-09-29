import React from 'react'

import { Formik } from 'formik'

const Register = () => {
	return (
		<Formik>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Name" name="name" onChange={handleChange} /> <br /><br />
					<input type="email" placeholder="Email" name="email" onChange={handleChange} /> <br /> <br />
					<input type="password" placeholder="Password" name="password" onChange={handleChange} /> <br /> <br />
					<button type="submit">Register</button>
				</form>
			)}
		</Formik>
	)
}

export default Register