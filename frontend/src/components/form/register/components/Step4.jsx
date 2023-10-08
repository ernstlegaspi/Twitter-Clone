import React from 'react'

const Step4 = ({ email, setVerificationOtp }) => {
	return (
		<>
			<p className="mt-6 text-[33px] font-bold">Create your account</p>
			<p className="homepage-text-color">Enter it below to verify {email}</p>
			<input onChange={e => setVerificationOtp(e.target.value)} type="text" placeholder="Verification Code" className="mt-6 w-full border border-color outline-sky-500 px-2 py-4 rounded text-lg" />
			<p className="mt-1 text-sm text-sky-500 hover:underline cursor-pointer">Resend Code</p>
		</>
	)
}

export default Step4