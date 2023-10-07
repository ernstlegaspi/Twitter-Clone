import React from 'react'

import { months, days, years } from '../../../../constants'

const Step1 = ({ _months, _days, _years, setMonths, setDays, setYears, handleStep1 }) => {
	return (
		<>
			<p className="mt-6 text-[33px] font-bold">Create your account</p>
			<input onChange={e => handleStep1(e)} name="name" type="text" placeholder="Name" className="outline-blue-400 border border-color rounded w-full py-4 px-2 mt-6" />
			<input onChange={e => handleStep1(e)} type="email" placeholder="Email" name="email" className="outline-blue-400 border border-color rounded w-full py-4 px-2 mt-6" />
			<p className="font-bold mt-8">Date of birth</p>
			<p className="mt-2 mb-5 leading-4 text-[15px] homepage-text-color">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
			<div className="w-full">
				<select onChange={e => setMonths(e.target.value)} value={_months} name="months" className="w-[45%] border border-color rounded p-2 py-4 outline-blue-400">
					<option value=""></option>
					{months.map((month, index) => <option key={index} value={month}>{month}</option>)}
				</select>
				<select onChange={e => setDays(e.target.value)} value={_days} name="days" className="mx-3 w-[20%] border border-color rounded p-2 py-4 outline-blue-400">
					<option value=""></option>
					{days.map((day, index) => <option key={index} value={day}>{day}</option>)}
				</select>
				<select onChange={e => setYears(e.target.value)} value={_years} name="years" className="w-[29%] border border-color rounded p-2 py-4 outline-blue-400">
					<option value=""></option>
					{years.map((year, index) => <option key={index} value={year}>{year}</option>)}
				</select>
			</div>
		</>
	)
}

export default Step1