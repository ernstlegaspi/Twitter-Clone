import React, { lazy, Suspense, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getAllTweets } from '../../api/api'
import { setTweets } from '../../slices/tweet/tweetSlice'
import { logout } from '../../slices/auth/authSlice'

const HomeContent = lazy(() => import('./components/homeContent'))

const LoggedInHome = ({ user }) => {
	const dispatch = useDispatch()
	const tweets = useSelector(state => state.tweet.tweets)

	useEffect(() => {
		const getTweetsApi = async () => {
			try {
				const { data } = await getAllTweets()

				console.log(tweets)

				dispatch(setTweets(data.result))
			}
			catch(error) {
				if(!localStorage.getItem('userInfo')) {
					dispatch(logout())
					window.location.href = '/'
				}
			}
		}

		getTweetsApi()
	}, [dispatch])

	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<HomeContent tweets={tweets} user={user} />
			</Suspense>
		</>
	)
}

export default LoggedInHome
