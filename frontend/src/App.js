import React, { lazy, Suspense, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

const Home = lazy(() => import('./components/home/home'))
const ProfilePage = lazy(() => import('./components/profile/profilePage'))
const Sidebar = lazy(() => import('./components/sidebar/Sidebar'))
const PostForm = lazy(() => import('./components/modals/postForm'))

const App = () => {
	const [showPostForm, setShowPostForm] = useState(false)
	const user = JSON.parse(localStorage.getItem('userInfo'))

	return (
		<div className={`h-screen w-full flex ${user ? '' : 'justify-center'} relative`}>
			<BrowserRouter>
				<Toaster />
				<Suspense fallback={<p>Loading...</p>}>
					{user ? <Sidebar showPostForm={setShowPostForm} user={user} /> : null}
					{showPostForm ? <PostForm showPostForm={setShowPostForm} /> : null}
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/:username' element={<ProfilePage />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

export default App
