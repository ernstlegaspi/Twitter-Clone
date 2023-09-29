import React, { lazy, Suspense } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./components/home/home'))

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<p>Loading...</p>}>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
