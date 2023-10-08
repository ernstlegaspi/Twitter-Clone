import React from 'react'

import { AiOutlineCheck } from 'react-icons/ai'

const Step3 = ({ name, email, dateOfBirth }) => {
	const card = (label, text) => (
		<div className="border border-color rounded p-2 mb-6">
			<p className="text-sm homepage-text-color">{label}</p>
			<div className="flex justify-between items-center">
				<p>{text}</p>
				<div className="w-max h-max p-1 bg-green-500 rounded-full text-white">
					<AiOutlineCheck size={12} />
				</div>
			</div>
		</div>
	)

	const blueText = text => <span className="cursor-pointer hover:underline text-sky-500">{text}</span>
	
	return (
		<>
			<p className="my-6 text-[33px] font-bold">Create your account</p>
			{card("Name", name)}
			{card("Email", email)}
			{card("Date of birth", dateOfBirth)}
			<p className="absolute bottom-24 leading-4 text-sm homepage-text-color">By signing up, you agree to the {blueText("Terms of Service")} and {blueText("Privacy Policy")}, including {blueText("Cookie Use")}. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. {blueText("Learn more")}. Others will be able to find you by email or phone number, when provided, unless you choose otherwise {blueText("here")}.</p>
		</>
		
	)
}

export default Step3