import React, { useState, lazy, Suspense, useTransition } from 'react'

// import { useDispatch } from 'react-redux'
// import { login } from '../../../slices/auth/authSlice'
// import { register } from '../../../api/api'
import { generateOtp, sendOtp } from '../../../api/api'

import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs'

import { toast } from 'react-hot-toast'

const Step1 = lazy(() => import('./components/Step1'))
const Step2 = lazy(() => import('./components/Step2'))
const Step3 = lazy(() => import('./components/Step3'))
const Step4 = lazy(() => import('./components/Step4'))
const Step5 = lazy(() => import('./components/Step5'))

const RegisterForm = () => {
	// const [formData, setFormData] = useState({ name: '', email: '', password: '' })
	
	const [step1, setStep1] = useState({ name: '', email: '' })
	const [_months, setMonths] = useState('')
	const [_days, setDays] = useState('')
	const [_years, setYears] = useState('')
	const [verificationOtp, setVerificationOtp] = useState('')
	const [count, setCount] = useState(1)
	// eslint-disable-next-line
	const [isPending, startTransition] = useTransition()
	
	let generatedOtp = ''

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

	const handleBack = () => {
		if(count === 1) {
			return
		}

		setCount(prev => prev - 1)
	}

	const handleButton = async () => {
		if(!step1.name || !step1.email || !_months || !_days || !_years) {
			toast.error("All fields are required")
			
			return
		}

		startTransition(() => setCount(prev => prev + 1))

		if(count === 3) {
			const res = await generateOtp()
			const { otp } = res.data
			
			generatedOtp = otp

			await sendOtp({ email: step1.email, name: step1.name, otp })
			
			return
		}

		if(count === 4) {
			if(verificationOtp.length() !== 6 || verificationOtp === '') {
				toast.error('Enter a valid otp')
				startTransition(() => setCount(prev => prev - 1))
			}

			return
		}
	}

	return (
		<>
			<div className="bg-white h-[650px] w-[600px] rounded-[15px] pt-2 pl-2">
				<div className="flex h-full">
					<div onClick={handleBack} className="hover:bg-gray-200 rounded-full p-2 w-max h-max cursor-pointer">
						{count === 1 ? <AiOutlineClose size={19} /> : <BsArrowLeft size={19} /> }
					</div>
					<div className="ml-7 w-[76%] h-full relative">
						<p className="text-xl font-bold mt-[2px]">Step {count} of 5</p>
						<button onClick={handleButton} className={`absolute bottom-0 mb-5 text-center rounded-full text-white font-bold text-lg ${count === 3 ? 'bg-sky-500' : 'bg-black'} w-full py-3`}>
							{count === 3 ? 'Sign up' : 'Next'}
						</button>
						<Step5 />
						{/* <Suspense fallback={<p>Loading...</p>}>
							{count === 1 ? <Step1 name={step1.name} email={step1.email} handleStep1={handleStep1} _months={_months} _days={_days} _years={_years} setMonths={setMonths} setDays={setDays} setYears={setYears} /> : count === 2 ? <Step2 /> : count === 3 ? <Step3 name={step1.name} email={step1.email} dateOfBirth={`${_months.substring(0, 3)} ${_days}, ${_years}`} /> :
							<Step4 setVerificationOtp={setVerificationOtp} email={step1.email} />}
						</Suspense> */}
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