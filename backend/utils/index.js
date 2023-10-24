// 2** http res status codes
export const success = (res, result, message, code = 200) => res.status(code).json({
	success: true,
	result,
	message
})

// 4** http res status codes
export const badReq = (res, message) => res.status(400).json({
	success: false,
	result: null,
	message
})

export const clientError = (res, message, code = 400) => res.status(code).json({
	success: false,
	result: null,
	message
})

export const conflict = (res, message) => res.status(409).json({
	success: false,
	result: null,
	message
})

// 5** http res status codes
export const serverError = (res, message = 'Internal Server Error') => res.status(500).json({
	success: false,
	result: null,
	message
})
