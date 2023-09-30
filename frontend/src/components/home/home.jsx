import React, { lazy, Suspense, useState, useTransition } from 'react'

const LoggedInHome = lazy(() => import('./loggedInHome'))

const LoginForm = lazy(() => import('../form/login'))
const RegisterForm = lazy(() => import('../form/register'))

const Home = () => {
	const [isLoginForm, setIsLoginForm] = useState(true)
	// eslint-disable-next-line
	const [isPending, startTransition] = useTransition()
	const isLoggedIn = localStorage.getItem('userInfo')

	return (
		<div>
			<Suspense fallback={<p>Loading...</p>}>
				{ isLoggedIn ? <LoggedInHome /> : (
					<>
						<button onClick={() => {startTransition(() => setIsLoginForm(prev => !prev))}}>Toggle Form</button>
						{isLoginForm ? <LoginForm /> : <RegisterForm />}
					</>
				) }
			</Suspense>
		</div>
	)
}

export default Home