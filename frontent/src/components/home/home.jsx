import React, { lazy, Suspense, useState, useTransition } from 'react'

const LoggedInHome = lazy(() => import('./loggedInHome'))

const LoginForm = lazy(() => import('../form/login'))
const RegisterForm = lazy(() => import('../form/register'))

const Home = () => {
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [isPending, startTransition] = useTransition()
	const isLoggedIn = localStorage.getItem('userInfo')

	return (
		<div>
			<button onClick={() => {
				startTransition(() => setIsLoginForm(prev => !prev))
			}}>Toggle Form</button>
			<Suspense fallback={<p>Loading...</p>}>
				{ isLoggedIn ? <LoggedInHome /> : isLoginForm ? <LoginForm /> : <RegisterForm /> }
			</Suspense>
		</div>
	)
}

export default Home