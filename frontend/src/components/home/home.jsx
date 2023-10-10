import React, { lazy, Suspense } from 'react'

const LoggedInHome = lazy(() => import('./loggedInHome'))
const LandingPage = lazy(() => import('./components/landingPage'))

const Home = () => {
	const isLoggedIn = localStorage.getItem('userInfo')

	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				{isLoggedIn ? <LoggedInHome /> : <LandingPage />}
			</Suspense>
		</>
	)
}

export default Home