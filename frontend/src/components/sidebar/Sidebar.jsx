import React, { useEffect, useTransition } from 'react'

import { BsBookmark, BsHouseDoor, BsPeople, BsPerson, BsThreeDots } from 'react-icons/bs'
import { AiOutlineMail, AiOutlineSearch } from 'react-icons/ai'
import { RiFileList2Line, RiNotification2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'
import SidebarItem from './sidebarItem'
import { getNotificationCount, updateNotificationCount } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationCount } from '../../slices/notifications/notificationSlice'

const Sidebar = ({ showLogoutModal, showPostForm, user }) => {
	// eslint-disable-next-line
	const [_, startTransition] = useTransition()
	const navigate = useNavigate()
	const notificationCount = useSelector(state => state.notification.notificationCount)
	const dispatch = useDispatch()

	useEffect(() => {
		const notificationCountGet = async () => {
			const { data } = await getNotificationCount(user?._id)

			dispatch(setNotificationCount(data.result))
		}
		
		notificationCountGet()
	}, [dispatch, user?._id])
	
	const handleClickCondition = label => {
		switch(label) {
			case 'Home':
				navigate('/')
				break
			case 'Explore':
				navigate('/Explore')
				break
			case 'Notifications':
				navigate('/notifications')
				break
			case 'Messages':
				navigate('/messages')
				break
			case 'Lists':
				navigate('/Lists')
				break
			case 'Bookmarks':
				navigate('/bookmarks')
				break
			case 'Communities':
				navigate('/Communities')
				break
			default:
				navigate(user.username)
				break;
		}
	}

	const ListItems = () => (
		<>
			<SidebarItem onClick={() => handleClickCondition('Home')} Icon={BsHouseDoor} label='Home' />
			<SidebarItem onClick={() => handleClickCondition('Explore')} Icon={AiOutlineSearch} label='Explore' />
			<SidebarItem onClick={async () => {
				dispatch(setNotificationCount(0))
				handleClickCondition('Notifications')

				await updateNotificationCount({ userId: user._id })
			}} Icon={RiNotification2Line} label='Notifications' notificationCount={notificationCount} />
			<SidebarItem onClick={() => handleClickCondition('Messages')} Icon={AiOutlineMail} label='Messages' />
			<SidebarItem onClick={() => handleClickCondition('Lists')} Icon={RiFileList2Line} label='Lists' />
			<SidebarItem onClick={() => handleClickCondition('Bookmarks')} Icon={BsBookmark} label='Bookmarks' />
			<SidebarItem onClick={() => handleClickCondition('Communities')} Icon={BsPeople} label='Communities' />
			<SidebarItem onClick={() => handleClickCondition('Profile')} Icon={BsPerson} label='Profile' username={user.username} />
		</>
	)

	return (
		<div className="w-[30.8%] flex justify-end relative">
			<div className="w-[265px] mt-[2px] relative">
				<div className="w-max">
					<Link to="/">
						<div className="hover:bg-gray-200 flex justify-center items-center p-2 rounded-full cursor-pointer">
							<LazyLoadImage className="mt-1" src="/images/logo.webp" alt="X" effect='blur' width={35} height={35} />
						</div>
					</Link>
				</div>
				<ListItems />
				<button onClick={() => startTransition(() => showPostForm(true))} className="mt-7 font-bold text-white rounded-full purple-button hover:bg-violet-600 transition-all w-[85%] py-[10px] text-lg">Post</button>
				<div onClick={() => showLogoutModal(true)} className="cursor-pointer transition-all hover:bg-gray-200 w-[95%] flex items-center rounded-full p-3 absolute bottom-5">
					<p className="purple-button rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-3">{user.name.charAt(0)}</p>
					<div className="flex items-center justify-between w-full">
						<div>
							<p className="font-bold">{user.name}</p>
							<p className="homepage-text-color text-[15px]">@{user.username}</p>
						</div>
						<BsThreeDots />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar