import jwt from 'jsonwebtoken'

import User from '../models/user.js'

import { badReq, serverError } from '../utils/index.js'

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]

		if(!token) return res.status(401).json({
			success: false,
			result: null,
			message: 'Unauthorized: Token is not valid'
		})

		const decodedData = jwt.verify(token, process.env.KEY)

		if(!decodedData) return res.status(401).json({
			success: false,
			result: null,
			message: 'Token is not valid'
		})

		const user = await User.findOne({ _id: decodedData.id })

		if(!user) return badReq(res, 'User is not existing')

		req.userId = decodedData.id

		next()
	}
	catch(error) {
		serverError(res)
	}
}
