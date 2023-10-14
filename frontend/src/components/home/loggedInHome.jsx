import React, { lazy, Suspense, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getAllTweets } from '../../api/api'
import { setTweets } from '../../slices/tweet/tweetSlice'

const HomeContent = lazy(() => import('./components/homeContent'))

const LoggedInHome = () => {
	const dispatch = useDispatch()
	const tweets = useSelector(state => state.tweet.tweets)

	useEffect(() => {
		const getTweetsApi = async () => {
			const { data } = await getAllTweets()

			dispatch(setTweets(data.result))
		}

		getTweetsApi()
	}, [dispatch])

	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<HomeContent tweets={tweets} />
			</Suspense>
		</>
	)
}

export default LoggedInHome
