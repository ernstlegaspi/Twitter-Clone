import React, { lazy, Suspense } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

const Home = lazy(() => import('./components/home/home'))
const ProfilePage = lazy(() => import('./components/profile/profilePage'))

const App = () => {
	return (
		<BrowserRouter>
			<Toaster />
			<Suspense fallback={<p>Loading...</p>}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/:username' element={<ProfilePage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
