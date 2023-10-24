import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'

import { getNotifications } from '../../api/api'
import { setNotifications } from '../../slices/notifications/notificationSlice'
import NotificationCard from '../cards/NotificationCard'
import TweetCard from '../cards/tweetCard'

const NotificationPage = ({ user }) => {
	const loading = useRef(true)
	const notifications = useSelector(state => state.notification.notification)
	const dispatch = useDispatch()
	
	useEffect(() => {
		const getNotifs = async () => {
			const { data } = await getNotifications(user._id)

			dispatch(setNotifications(data.result.notifications.reverse()))
		}

		loading.current = true

		getNotifs()

		loading.current = false
	}, [dispatch, user._id])
	
	const buttonMenu = (onClick, text, isActive, width) => <div onClick={onClick} className="px-5 flex-grow relative h-[57px] cursor-pointer hover:bg-gray-200 transition all flex flex-col items-center justify-end">
		<div className={`flex items-center justify-center h-full ${isActive ? 'text-black font-bold' : 'text-gray-500 font-semibold'}`}>{text}</div>
		{isActive ? <div className={`absolute bg-indigo-500 rounded-full h-[5px] ${width}`}></div> : null}
	</div>

	const Header = () => <div className="border-b border-color w-full relative">
		<p className="my-3 ml-3 font-bold text-lg">Notifications</p>
		<div className="flex justify-center relative">
			{buttonMenu(() => {}, 'All', true, 'w-[35px]')}
			{buttonMenu(() => {}, 'Verified', false, 'w-[70px]')}
			{buttonMenu(() => {}, 'Mentions', false, 'w-[75px]')}
		</div>
	</div>
	
	return (
		<div className="h-full feed-scroll w-[600px] border border-y-0 border-color relative">
			<Header />
			{!notifications || loading.current ? <div className="mt-[60%] w-full flex items-center justify-center">
				<PulseLoader color="#0EA5E9" />
			</div> : (
				<>
					{notifications.map(notification => notification.notificationType === 'Comment' ? <TweetCard isNotification={true} tweet={notification.tweetId} user={user} /> :  <NotificationCard key={notification._id} notification={notification} />)}
				</>
			)}
		</div>
	)
}

export default NotificationPage