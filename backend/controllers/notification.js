import { serverError, success } from "../utils/index.js"

import Notification from '../models/notification.js'
import User from '../models/user.js'

export const addNotification = async (req, res) => {
	try {
		const { userId } = req.params
		
		const newNotification = await new Notification({ ...req.body }).save()

		const n = await User.findByIdAndUpdate(userId,
			{
				$push: { notifications: newNotification._id },
				$inc: { notificationCount: 1 }
			},
			{ new: true }
		)

		console.log(n)

		success(res, {}, 'Notification created', 201)
	}
	catch(error) {
		serverError(res)
	}
}

export const getNotificationCount = async (req, res) => {
	try {
		const { userId } = req.params
		
		const notificationCount = await User.findById({ _id: userId })
		
		success(res, notificationCount.notificationCount, 'Notification Count Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}

export const updateNotificationCount = async (req, res) => {
	try {
		const { userId } = req.body
		
		await User.findByIdAndUpdate(userId,
			{ $set: { notificationCount: 0 } },
			{ new: true }
		)

		res.end()
	}
	catch(error) {
		serverError(res)
	}
}

export const getNotificationByUser = async (req, res) => {
	try {
		const { userId } = req.params

		const userNotifications = await User.findById({ _id: userId })
		.populate({
			path: 'notifications',
			populate: {
				path: 'tweetId',
				model: 'Tweet'
			}
		})
		.exec()

		success(res, userNotifications, 'Notifications Retrieved')
	}
	catch(error) {
		serverError(res)
	}
}
