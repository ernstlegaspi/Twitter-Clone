import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { login } from '../../slices/auth/authSlice'
import { loginApi } from '../../api/api'

import { AiFillApple, AiOutlineClose, AiOutlineGoogle } from 'react-icons/ai'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import { toast } from 'react-hot-toast'

import 'react-lazy-load-image-component/src/effects/blur.css'

const LoginFormModal = ({ setShowLogin }) => {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({ emailUsername: '', password: '' })

	const handleSubmit = async e => {
		e.preventDefault()
		
		try {
			const { data } = await loginApi({ ...formData })
			dispatch(login(data.result))
			window.location.reload()
		}
		catch(error) {
			toast.error(`Error logging in ${error}`)
		}
	}
	
	const handleFormData = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	return (
		<div className="bg-black/40 inset-0 absolute z-20 flex items-center justify-center">
			<div className="bg-white h-[650px] w-[600px] rounded-[15px] pt-2 pl-2">
				<div className="flex h-full">
					<div onClick={() => setShowLogin(false)} className="hover:bg-gray-200 rounded-full p-2 w-max h-max cursor-pointer">
						<AiOutlineClose size={19} />
					</div>
					<div className="ml-[110px] h-full relative">
						<div className="flex justify-center">
							<LazyLoadImage width={40} height={40} effect='Blur' alt="X" src="/images/logo.webp" />
						</div>
						<p className="font-bold text-[28px] mt-6">Sign in to X</p>
						<div className="cursor-pointer transition-all hover:bg-slate-200 mt-6 py-[6px] w-[300px] justify-center rounded-full border flex items-center max-[400px]:w-[100%]">
							<AiOutlineGoogle size={22} className="mr-1" />
							<p className="font-semibold text-[18px]">Sign up with Google</p>
						</div>
						<div className="cursor-pointer transition-all hover:bg-slate-200 mt-6 py-[6px] w-[300px] justify-center rounded-full border flex items-center max-[400px]:w-[100%]">
							<AiFillApple size={22} className="mr-1" />
							<p className="font-semibold text-[18px]">Sign up with Apple</p>
						</div>
						<div className="relative mt-6">
							<div className="w-auto bg-slate-200 h-[1px]"></div>
							<div className="flex justify-center">
								<div className="bg-white w-[30px] text-center absolute mt-[-15px]">or</div>
							</div>
						</div>
						<form onSubmit={handleSubmit} className="flex flex-col">
							<input type="text" onChange={e => handleFormData(e)} name="emailUsername" placeholder="Email or username" className="mt-5 py-4 px-2 w-full border border-color rounded outline-sky-500" />
							<input type="password" onChange={e => handleFormData(e)} name="password" placeholder="Password" className="mt-5 py-4 px-2 w-full border border-color rounded outline-sky-500" />
							<button type="submit" className="text-white bg-black rounded-full w-full mt-6 py-[6px]">Sign in</button>
						</form>
						<button className="font-semibold text-black border border-color rounded-full w-full mt-6 py-[6px]">Forgot Password?</button>
						<p className="mt-9 text-base homepage-text-color">Don't have an account? <span className="cursor-pointer hover:underline text-sky-500">Sign up</span></p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginFormModal