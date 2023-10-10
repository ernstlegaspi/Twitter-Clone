import React, { lazy, Suspense, useState, useTransition } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import { footerNavigationText } from '../../../constants'
import { AiFillApple, AiOutlineGoogle } from 'react-icons/ai'

import 'react-lazy-load-image-component/src/effects/blur.css'

const LoginModal = lazy(() => import('../../form/login/login'))
const RegisterModal = lazy(() => import('../../form/register/register'))

const LandingPage = () => {
	const [showLogin, setShowLogin] = useState(false)
	const [showRegister, setShowRegister] = useState(false)

	// eslint-disable-next-line
	const [isLoading, startTransition] = useTransition()
	
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
						<div className="cursor-pointer transition-all hover:bg-slate-200 mt-6 py-1 w-[300px] justify-center rounded-full border flex items-center max-[400px]:w-[100%]">
							<AiOutlineGoogle size={22} className="mr-1" />
							<p className="font-semibold text-[18px]">Sign up with Google</p>
						</div>
						<div className="cursor-pointer transition-all hover:bg-slate-200 mt-6 py-1 w-[300px] justify-center rounded-full border flex items-center max-[400px]:w-[100%]">
							<AiFillApple size={22} className="mr-1" />
							<p className="font-semibold text-[18px]">Sign up with Apple</p>
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
