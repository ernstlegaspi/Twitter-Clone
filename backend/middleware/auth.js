import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]

		if(!token) return res.status(401).json({
			success: false,
			result: null,
			message: 'Unauthorized: Token is not valid'
		})

		const decodedData = jwt.verify(token, process.env.KEY)
		console.log("decodedData")
		if(!decodedData) return res.status(401).json({
			success: false,
			result: null,
			message: 'Token is not valid'
		})

		const user = await User.findOne({ _id: decodedData.id })

		if(!user)  return res.status(400).json({
			success: false,
			result: null,
			message: 'User is not existing'
		})

		req.userId = decodedData.id

		next()
	}
	catch(error) {
		res.status(500).json({
			success: false,
			result: null,
			error,
			message: 'Internal Server Error'
		})
	}
}
