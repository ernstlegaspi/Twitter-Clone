import { clientError, serverError, success } from '../utils/index.js'

export const create = async (req, res, Model, message, fields) => {
	try {
		const data = { ...req.body }

		for(const field of fields) {
			if(!data[field]) return clientError(res, 'Invalid credentials')
		}

		let willLoop = true
		let rand = 0
		let document = null
		
		while(willLoop) {
			rand = Math.floor(Math.random() * 1000000000)

			document = await Model.find({ uniqueId: rand })

			if(document.length < 1) willLoop = false
		}

		const result = await new Model({ ...data, uniqueId: rand }).save()

		if(!result) return serverError(error, 'Can not create document')

		success(res, result, message, 201)
	}
	catch(error) {
		serverError(res)
	}
}

export const getDocuments = async (res, Model, filter) => {
	try {
		const documents = await Model.find(filter).sort({ createdAt: -1 })

		success(res, documents, 'Documents Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const getDocument = async (res, Model, filter) => {
	try {
		const document = await Model.findOne(filter)

		success(res, document, 'Document Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

// export const update = async (req, res) => {
// 	try {
// 		const { id, userId } = req.body

// 		if(!id) return clientError(res, 'Tweet id not found')
		
// 		if(!userId) return clientError(res, 'User not logged in')

// 		const tweet = await Tweet.findByIdAndUpdate(id,
// 			{ $push: { likedUserId: userId } },
// 			{ new: true }
// 		)

// 		if(!tweet) return clientError(res, 'Can not like tweet')

// 		success(res, tweet, 'Tweet liked')
// 	}
// 	catch(error) {
// 		serverError(res)
// 	}
// }
