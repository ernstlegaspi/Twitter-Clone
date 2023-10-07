import React, { lazy, Suspense } from 'react'
// import React, { lazy, Suspense, useState, useTransition } from 'react'

// const LoggedInHome = lazy(() => import('./loggedInHome'))
const LandingPage = lazy(() => import('./landing_page/landingPage'))

// const LoginForm = lazy(() => import('../form/login/login'))
// const RegisterForm = lazy(() => import('../form/register/register'))

const Home = () => {
	// const [isLoginForm, setIsLoginForm] = useState(true)
	// eslint-disable-next-line
	// const [isPending, startTransition] = useTransition()
	// const isLoggedIn = localStorage.getItem('userInfo')

	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<LandingPage />
			</Suspense>
		</>
		//  <div className="h-screen">
		//  	<div className="flex h-[96%]">
		// 		<div className="w-[50%] flex items-center justify-center">
		//  			<LazyLoadImage src="/images/logo.webp" width={90} height={90} alt="Logo" effect='blur' />
		//  		</div>
		// 		<Suspense fallback={<p>Loading...</p>}>
		// 			{ isLoggedIn ? <LoggedInHome /> : (
		// 				<>
		// 					<button onClick={() => {startTransition(() => setIsLoginForm(prev => !prev))}}>Toggle Form</button>
		// 					{isLoginForm ? <LoginForm /> : <RegisterForm />}
		// 				</>
		// 			) }
		// 		</Suspense>
		// 	</div>
		// </div>
	)
}

export default Home