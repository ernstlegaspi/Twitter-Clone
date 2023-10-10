import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const login = async (req, res) => {
	try {
		const { emailUsername, password } = req.body

		if(!emailUsername || !password) return res.status(400).json({
			success: false,
			result: null,
			message: 'Invalid Credentials'
		})

		let user = null

		if(emailUsername.includes("@") && emailUsername.includes(".com")) {
			user = await User.findOne({ email: emailUsername })
		}
		else {
			user = await User.findOne({ username: emailUsername })
		}

		if(!user) return res.status(400).json({
			success: false,
			result: null,
			message: 'No user found'
		})

		const comparePassword = await bcrypt.compare(password, user.password)

		if(!comparePassword) return res.status(400).json({
			success: false,
			result: null,
			message: 'No user found'
		})

		const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '3h' })

		delete user.password

		res.status(200).json({
			success: true,
			result: {
				id: user._id,
				name: user.name,
				email: user.email,
				username: user.username,
				token
			},
			message: 'Successfully logged in'
		})
	}
	catch(error) {
		res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error',
			error
		})
	}
}

export const register = async (req, res) => {
	try {
		const { name, email, password, birthday } = req.body

		console.log(birthday)

		if(!name || !email || !password || !birthday) return res.status(400).json({
			success: false,
			result: null,
			message: 'Invalid Credentials'
		})

		const existingUser = await User.findOne({ email })

		if(existingUser) return res.status(409).json({
			success: false,
			result: null,
			message: 'Email already existing'
		})

		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = new User({ name, email, username: name.replace(' ', ''), password: hashedPassword, birthday })
		
		if(!newUser) return res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error'
		})
		
		const user = await newUser.save()

		const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '15m' })

		res.status(201).json({
			success: true,
			result: {
				id: user._id,
				name: user.name,
				email: user.email,
				username: user.username,
				token
			},
			message: 'Successfully logged in'
		})
	}
	catch(error) {
		res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error',
			error
		})
	}
}
