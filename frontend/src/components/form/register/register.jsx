import React, { useState, lazy, Suspense, useTransition } from 'react'

// import { useDispatch } from 'react-redux'
// import { login } from '../../../slices/auth/authSlice'
// import { register } from '../../../api/api'

import { AiOutlineClose } from 'react-icons/ai'

import { toast } from 'react-hot-toast'
import Step1 from './components/Step1'

const Step2 = lazy(() => import('./components/Step2'))

const RegisterForm = () => {
	// const [formData, setFormData] = useState({ name: '', email: '', password: '' })
	
	const [step1, setStep1] = useState({ name: '', email: '' })
	const [_months, setMonths] = useState('')
	const [_days, setDays] = useState('')
	const [_years, setYears] = useState('')
	const [count, setCount] = useState(1)
	// eslint-disable-next-line
	const [isPending, startTransition] = useTransition()
	// const dispatch = useDispatch()
	
	// const handleSubmit = async e => {
	// 	e.preventDefault()
		
	// 	try {
	// 		const { data } = await register({ ...formData })
	// 		dispatch(login(data.result))
	// 		window.location.reload()
	// 	}
	// 	catch(error) {
	// 		alert(`Can not register ${error}`)
	// 	}
	// }

	const handleStep1 = e => setStep1({ ...step1, [e.target.name]: e.target.value })

	const handleNext = () => {
		if(!step1.name || !step1.email || !_months || !_days || !_years) {
			toast.error("All fields are required")
			
			return
		}

		startTransition(() => setCount(prev => prev + 1))
	}

	return (
		<>
			<div className="bg-white h-[650px] w-[600px] rounded-[15px] pt-2 pl-2">
				<div className="flex h-full">
					<div className="hover:bg-gray-200 rounded-full p-2 w-max h-max cursor-pointer">
						<AiOutlineClose size={19} />
					</div>
					<div className="ml-7 w-[76%] h-full relative">
						<p className="text-xl font-bold mt-[2px]">Step {count} of 5</p>
						{count === 1 ? <Step1 handleStep1={handleStep1} _months={_months} _days={_days} _years={_years} setMonths={setMonths} setDays={setDays} setYears={setYears} /> : <Suspense fallback={<p>Loading...</p>}><Step2 /></Suspense>}
						<button onClick={handleNext} className='absolute bottom-0 mb-5 text-center rounded-full text-white font-bold text-lg bg-black w-full py-3'>Next</button>
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