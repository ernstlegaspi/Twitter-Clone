import React, { lazy, Suspense, useEffect, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { getCurrentUser } from './api/api'
import { setCurrentUser } from './slices/user/userSlice'

const Home = lazy(() => import('./components/home/home'))
const ProfilePage = lazy(() => import('./components/profile/profilePage'))
const Sidebar = lazy(() => import('./components/sidebar/Sidebar'))
const Trends = lazy(() => import('./components/trends/Trends'))
const PostForm = lazy(() => import('./components/modals/postForm'))

const App = () => {
	const [showPostForm, setShowPostForm] = useState(false)
	const userInfo = JSON.parse(localStorage.getItem('userInfo'))

	const user = useSelector(state => state.user.user)
	
	const dispatch = useDispatch()

	useEffect(() => {
		const currentUser = async () => {
			try {
				const { data } = await getCurrentUser(userInfo?.id)

				if(data.message !== 'Current user retrieved') return

				dispatch(setCurrentUser(data.result))
			}
			catch({ response }) {
				if(response.data.message !== 'Internal Server Error') return

				toast.error('Invalid Token')
				localStorage.removeItem('userInfo')
				localStorage.removeItem('persist:root')
			}
		}

		currentUser()
	}, [userInfo?.id, dispatch])

	return (
		<div className={`h-screen w-full flex ${user ? '' : 'justify-center'} relative`}>
			<BrowserRouter>
				<Toaster />
				<Suspense fallback={<p>Loading...</p>}>
					{user ? <Sidebar showPostForm={setShowPostForm} user={user} /> : null}
					{showPostForm ? <PostForm showPostForm={setShowPostForm} /> : null}
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/:username' element={<ProfilePage user={user} />} />
					</Routes>
					{user ? <Trends /> : null}
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

export default App
