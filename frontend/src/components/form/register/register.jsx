import React, { useEffect, useState, lazy, Suspense, useTransition } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { login, setOtp } from '../../../slices/auth/authSlice'
import { generateOtp, register } from '../../../api/api'

import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs'

import { toast } from 'react-hot-toast'

import { PropagateLoader } from 'react-spinners'

const Step1 = lazy(() => import('./components/Step1'))
const Step2 = lazy(() => import('./components/Step2'))
const Step3 = lazy(() => import('./components/Step3'))
const Step4 = lazy(() => import('./components/Step4'))
const Step5 = lazy(() => import('./components/Step5'))

const RegisterForm = ({ setShowRegister }) => {
	// dates
	const [_months, setMonths] = useState('')
	const [_days, setDays] = useState('')
	const [_years, setYears] = useState('')

	// use info
	const [step1, setStep1] = useState({ name: '', email: '' })
	const [password, setPassword] = useState('')

	// otp
	const [verificationOtp, setVerificationOtp] = useState('')

	const [loading, setLoading] = useState(false)
	const [count, setCount] = useState(1)

	// eslint-disable-next-line
	const [isPending, startTransition] = useTransition()

	const dispatch = useDispatch()
	const generatedOtp = useSelector(state => state.auth.otp)
	
	const handleSubmit = async e => {
		e.preventDefault()

		if(password.length < 8 || password === '') {
			toast.error('Enter a valid password')

			return
		}
		
		try {
			const { data } = await register({ password, name: step1.name, email: step1.email })
			dispatch(login(data.result))
			window.location.reload()
		}
		catch(error) {
			toast.error(`Can not register ${error}`)
		}
	}

	const handleStep1 = e => setStep1({ ...step1, [e.target.name]: e.target.value })

	const handleBack = () => {
		if(count === 1) {
			setShowRegister(false)

			return
		}

		setCount(prev => prev - 1)
	}

	const handleButton = async () => {
		if(count === 3) {
			setLoading(true)

			const res = await generateOtp({ email: step1.email, name: step1.name })
			const { otp } = res.data
			
			dispatch(setOtp(otp))
			
			startTransition(() => setCount(prev => prev + 1))

			return
		}

		if(!step1.name || !step1.email || !_months || !_days || !_years) {
			toast.error("All fields are required")

			return
		}

		startTransition(() => setCount(prev => prev + 1))

		if(count === 4) {
			if(verificationOtp.length !== 6 || verificationOtp === '' || verificationOtp !== generatedOtp) {
				toast.error('Enter a valid otp')
				startTransition(() => setCount(prev => prev - 1))

				return
			}

			startTransition(() => setCount(5))
		}
	}

	useEffect(() => {
		if(generatedOtp !== '') setLoading(false)

	}, [generatedOtp])

	return (
		<div className="bg-black/40 inset-0 absolute z-20 flex items-center justify-center">
			<div className="bg-white h-[650px] w-[600px] rounded-[15px] pt-2 pl-2">
				{loading ? <PropagateLoader color="#0EA5E9" /> : (
					<div className="flex h-full">
						<div onClick={handleBack} className="hover:bg-gray-200 rounded-full p-2 w-max h-max cursor-pointer">
							{count === 1 ? <AiOutlineClose size={19} /> : <BsArrowLeft size={19} /> }
						</div>
						{count === 5 ? (
							<form onSubmit={handleSubmit} className="ml-7 w-[76%] h-full relative">
								<Step5 setPassword={setPassword} />
								<button type="submit" className='absolute bottom-0 mb-5 text-center rounded-full text-white font-bold text-lg bg-sky-500 w-full py-3'>
									Sign up
								</button>
							</form>
						) : (
							<div className="ml-7 w-[76%] h-full relative">
								<p className="text-xl font-bold mt-[2px]">Step {count} of 5</p>
								<button onClick={handleButton} className={`absolute bottom-0 mb-5 text-center rounded-full text-white font-bold text-lg ${count === 3 ? 'bg-sky-500' : 'bg-black'} w-full py-3`}>
									{count === 3 ? 'Sign up' : 'Next'}
								</button>
								<Suspense fallback={<p>Loading...</p>}>
									{count === 1 ? <Step1 name={step1.name} email={step1.email} handleStep1={handleStep1} _months={_months} _days={_days} _years={_years} setMonths={setMonths} setDays={setDays} setYears={setYears} /> : count === 2 ? <Step2 /> : count === 3 ? <Step3 name={step1.name} email={step1.email} dateOfBirth={`${_months.substring(0, 3)} ${_days}, ${_years}`} /> :
									<Step4 setVerificationOtp={setVerificationOtp} email={step1.email} />}
								</Suspense>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default RegisterForm