import Conversation from '../models/conversation.js'
import Message from '../models/message.js'
import User from '../models/user.js'

import { serverError, success } from '../utils/index.js'

export const newConversation = async (req, res) => {
	try {
		const { userId } = req.params
		
		const newConvo = await new Conversation({ ...req.body }).save()

		await User.findByIdAndUpdate(userId,
			{ $push: { conversations: newConvo._id } },
			{ new: true }
		)

		success(res, {}, 'Conversation created')
	}
	catch(e) {
		serverError(res)
	}
}

export const newMessage = async (req, res) => {
	try {
		const { conversationId } = req.params
		
		const _newMessage = await new Message({ ...req.body }).save()

		await Conversation.findByIdAndUpdate(conversationId,
			{ $push: { messages: _newMessage._id } },
			{ new: true }
		)

		success(res, {}, 'Message created')
	}
	catch(e) {
		serverError(res)
	}
}

export const getConversationMessages = async (req, res) => {
	try {
		const messages = await Conversation.findById({ _id: req.params.conversationId })
		.populate('messages')
		.exec()

		success(res, messages, 'Message created')
	}
	catch(e) {
		serverError(res)
	}
}
