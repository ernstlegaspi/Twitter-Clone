import React, { lazy, Suspense } from 'react'

import { useSelector } from 'react-redux'

const LoggedInHome = lazy(() => import('./loggedInHome'))
const LandingPage = lazy(() => import('./components/landingPage'))

const Home = () => {
	const user = useSelector(state => state.user.user)
	
	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				{user ? <LoggedInHome /> : <LandingPage />}
			</Suspense>
		</>
	)
}

export default Home