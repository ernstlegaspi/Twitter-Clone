import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { getCurrentUser } from './api/api'
import { setCurrentUser } from './slices/user/userSlice'

const Home = lazy(() => import('./components/home/home'))
const Sidebar = lazy(() => import('./components/sidebar/Sidebar'))
const Trends = lazy(() => import('./components/trends/Trends'))

// Modals
const LogoutModal = lazy(() => import('./components/modals/logoutModal'))
const PostFormModal = lazy(() => import('./components/modals/postFormModal'))

// Pages
const NotificationPage = lazy(() => import('./components/pages/notificationPage'))
const ProfilePage = lazy(() => import('./components/pages/profilePage'))
const TweetPage = lazy(() => import('./components/pages/tweetPage'))

/*
	TODO
	1. Retweet - Done
	2. Pin Tweet - Done
	3. Delete Tweet - Done
	4. Notifications - In progress
	5. Bookmarks - Waiting
	6. Followers - Waiting
	7. Following - Waiting
	8. Messages - Waiting
	9. Google Login - Waiting
	10. Facebook Login - Waiting
*/

const App = () => {
	const [showPostForm, setShowPostForm] = useState(false)
	const [showLogoutModal, setShowLogoutModal] = useState(false)
	const userInfo = JSON.parse(localStorage.getItem('userInfo'))
	const userInfoRef = useRef(userInfo)

	const user = useSelector(state => state.user.user)
	
	const dispatch = useDispatch()

	useEffect(() => {
		if(!userInfoRef.current) return
	
		const currentUser = async () => {
			try {
				const { data } = await getCurrentUser(userInfo?.id)

				if(data.message !== 'Current user retrieved') return

				dispatch(setCurrentUser(data.result))
			}
			catch({ response }) {
				if(response.data.message !== 'Internal Server Error') return

				dispatch(setCurrentUser(null))
				toast.error('Invalid Token')
				localStorage.removeItem('userInfo')
				localStorage.removeItem('persist:root')
			}
		}

		currentUser()
	}, [userInfoRef, userInfo?.id, dispatch])

	return (
		<div className={`h-screen w-full flex ${user ? '' : 'justify-center'} relative`}>
			<BrowserRouter>
				<Toaster />
				<Suspense fallback={<p>Loading...</p>}>
					{user ? <Sidebar showLogoutModal={setShowLogoutModal} showPostForm={setShowPostForm} user={user} /> : null}
					{showPostForm ? <PostFormModal showPostForm={setShowPostForm} /> : null}
					{showLogoutModal ? <LogoutModal showLogoutModal={setShowLogoutModal} /> : null}
					<Routes>
						<Route path='/' element={<Home user={user} />} />
						<Route path='/notifications' element={<NotificationPage user={user} />} />
						<Route path='/:username' element={<ProfilePage user={user} />} />
						<Route path='/:username/status/:id' element={<TweetPage user={user} />} />
					</Routes>
					{user ? <Trends /> : null}
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

export default App
