import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const login = async (req, res) => {
	try {
		const { email, password } = req.body

		if(!email || !password) return res.status(400).json({
			success: false,
			result: null,
			message: 'Invalid Credentials'
		})

		const user = await User.findOne({ email })

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

		const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '15m' })

		delete user.password

		res.status(200)
		.cookie('token', token, {
			maxAge: 900,
			sameSite: process.env.NODE_ENV !== 'production' ? 'none' : 'Lax',
			httpOnly: true,
			secure: true,
			domain: req.hostname,
			Path: '/'
		})
		.json({
			success: true,
			result: {
				id: user._id,
				name: user.firstName + " " + user.lastName,
				email: user.email
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
		const { firstName, lastName, email, password } = req.body

		if(!firstName || !lastName || !email || !password) return res.status(400).json({
			success: false,
			result: null,
			message: 'Invalid Credentials'
		})

		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = new User({ firstName, lastName, email, password: hashedPassword })
		
		if(!newUser) return res.status(500).json({
			success: false,
			result: null,
			message: 'Internal Server Error'
		})
		
		const user = await newUser.save()
		const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '15m' })
		
		res.status(201)
			.cookie('token', token, {
				maxAge: 900, // 15 minutes
				sameSite: process.env.NODE_ENV !== 'production' ? 'none' : 'Lax',
				httpOnly: true,
				secure: true,
				domain: req.hostname,
				Path: '/'
			})
			.json({
				success: true,
				result: {
					id: user._id,
					name: user.firstName + " " + user.lastName,
					email: user.email
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
