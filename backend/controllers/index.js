import { clientError, serverError, success } from '../utils/index.js'

export const create = async (req, res, Model, message, fields) => {
	try {
		const data = { ...req.body }

		for(const field of fields) {
			if(!data[field]) return clientError(res, 'Invalid credentials')
		}

		const result = await new Model(data).save()

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

export const getDocument = async (res, Model, _id) => {
	try {
		const document = await Model.findById({ _id })

		success(res, document, 'Document Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}
