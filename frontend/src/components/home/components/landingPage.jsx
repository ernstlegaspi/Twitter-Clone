import React, { lazy, Suspense, useState, useTransition } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import { footerNavigationText } from '../../../constants'
import { GoogleLogin } from '@react-oauth/google'

import 'react-lazy-load-image-component/src/effects/blur.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { login } from '../../../slices/auth/authSlice'
import { loginApi } from '../../../api/api'

const LoginModal = lazy(() => import('../../modals/loginModal'))
const RegisterModal = lazy(() => import('../../modals/register/registerModal'))

const LandingPage = () => {
	const [showLogin, setShowLogin] = useState(false)
	const [showRegister, setShowRegister] = useState(false)
	const dispatch = useDispatch()

	// eslint-disable-next-line
	const [_, startTransition] = useTransition()

	return (
		<div className="h-screen">
			<div className="h-[96%] w-[80%] mx-auto flex max-md:flex-col max-md:justify-center">
				<div className="flex items-center justify-center w-[43%] mt-[-10px] max-md:w-full max-md:flex-none max-md:items-start max-md:justify-start max-md:mt-[50px]">
					<LazyLoadImage className="w-[450px] h-[100%] max-md:w-[70px]" src="/images/logo.webp" alt="X" effect='blur' />
				</div>
				<div className="w-[57%] flex flex-col items-center max-md:w-full max-md:items-start">
					<div>
						<h1 className="mt-[170px] font-bold text-[65px] max-md:mt-0 max-md:text-[40px] max-sm:text-[30px]">Happening now</h1>
						<p className="mt-5 text-[35px] font-bold max-md:text-[25px]">Join today.</p>
						<div className="mt-2 w-[295px] flex justify-center">
							<GoogleLogin
								onSuccess={async response => {
									const { email } = jwtDecode(response.credential)
									const { data } = await loginApi({ emailUsername: email, isGoogle: true })

									dispatch(login(data.result))
									window.location.reload()
								}}
							/>
						</div>
						<div className="w-[300px] mt-6 max-[400px]:w-[100%]">
							<div className="w-auto bg-slate-200 h-[1px]"></div>
							<div className="flex justify-center">
								<div className="bg-white w-[30px] text-center absolute mt-[-15px]">or</div>
							</div>
							<div onClick={() => {
								startTransition(() => setShowRegister(true))
							}} className="bg-sky-500 cursor-pointer transition-all hover:bg-sky-600 mt-5 py-2 w-auto justify-center rounded-full border flex items-center">
								<p className="font-bold text-white text-[15px]">Create account</p>
							</div>
							<p className="mt-1 homepage-text-color text-[12px]">
								By signing up, you agree to the <span className="cursor-pointer text-sky-500 hover:underline">Terms of Service</span> and <span className="cursor-pointer text-sky-500 hover:underline">Privacy Policy</span>, including <span className="cursor-pointer text-sky-500 hover:underline">Cookie Use.</span>
							</p>
							<div className="mt-14">
								<p className="font-bold text-lg">Already have an account?</p>
								<div onClick={() => {
									startTransition(() => setShowLogin(true))
								}} className="cursor-pointer transition-all hover:bg-slate-200 mt-5 py-2 w-auto justify-center rounded-full border flex items-center">
									<p className="font-bold text-[15px] text-sky-500">Sign in</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center w-[100%] text-[13px] homepage-text-color">
				{footerNavigationText.map((text, index) => <p key={index} className="mr-5 inline-block cursor-pointer hover:underline">{text}</p>)}
				<p className="inline-block">&copy; 2023 X Corp.</p>
			</div>
			<Suspense fallback={<p>Loading...</p>}>
				{showLogin ? <LoginModal setShowLogin={setShowLogin} /> : null}
				{showRegister ? <RegisterModal setShowRegister={setShowRegister} /> : null}
			</Suspense>
		</div>
	)
}

export default LandingPage
