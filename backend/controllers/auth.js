import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

import { badReq, conflict, serverError, success } from '../utils/index.js'

export const login = async (req, res) => {
	try {
		const { emailUsername, password } = req.body

		if(!emailUsername || !password) return badReq(res, 'Invalid Credentials')

		let user = null

		if(emailUsername.includes("@") && emailUsername.includes(".com")) {
			user = await User.findOne({ email: emailUsername })
		}
		else {
			user = await User.findOne({ username: emailUsername })
		}

		if(!user) return badReq(res, 'No user found')

		const comparePassword = await bcrypt.compare(password, user.password)

		if(!comparePassword) return badReq(res, 'No user found')

		const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '3h' })

		delete user.password

		success(res, {
			id: user._id,
			token
		}, 'Successfully logged in')
	}
	catch(error) {
		serverError(res)
	}
}

export const register = async (req, res) => {
	try {
		const { name, email, password, birthday } = req.body

		if(!name || !email || !password || !birthday) return badReq(res, 'Invalid credentials')

		const existingUser = await User.findOne({ email })

		if(existingUser) return conflict(res, 'Email already existing')

		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = new User({ name, email, username: name.replace(' ', ''), password: hashedPassword, birthday })
		
		if(!newUser) return serverError(res)
		
		const user = await newUser.save()

		const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '15m' })

		success(res, {
			id: user._id,
			token
		}, 'User created', 201)
	}
	catch(error) {
		serverError(res)
	}
}
