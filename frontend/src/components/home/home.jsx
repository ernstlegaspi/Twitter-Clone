import React, { lazy, Suspense } from 'react'

const LoggedInHome = lazy(() => import('./loggedInHome'))
const LandingPage = lazy(() => import('./components/landingPage'))

const Home = ({ user }) => {
	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				{user ? <LoggedInHome user={user} /> : <LandingPage />}
			</Suspense>
		</>
	)
}

export default Home