import React, { lazy, Suspense, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addTweet, likeTweet, getAllTweets } from '../../api/api'
import { logout } from '../../slices/auth/authSlice'
import { setTweet } from '../../slices/tweet/tweetSlice'

const HomeContent = lazy(() => import('./components/homeContent'))

const LoggedInHome = () => {
	const dispatch = useDispatch()
	const { id, name, username } = JSON.parse(localStorage.getItem('userInfo'))
	const [body, setBody] = useState('')
	const tweets = useSelector(state => state.tweet.tweets)
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logout())
		window.location.reload()
	}
	
	const handleSubmit = async e => {
		e.preventDefault()

		await addTweet({ body, userId: id, name, username })

		const { data } = await getAllTweets()

		dispatch(setTweet(data.result))
	}

	const handleProfilePage = () => {
		dispatch(setTweet(null))
		navigate(username)
	}

	const handleLikeTweet = async tweetId => {
		await likeTweet({ id: tweetId, userId: id })
		
		const { data } = await getAllTweets()

		dispatch(setTweet(data.result))
	}

	useEffect(() => {
		const getTweetsApi = async () => {
			const { data } = await getAllTweets()

			dispatch(setTweet(data.result))
		}

		getTweetsApi()
	}, [dispatch])

	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<HomeContent />
			</Suspense>
			<div className="mt-2 ml-7">
				<div className="bg-gray-100 rounded-lg p-y w-[300px] h-[150px]">
				</div>
				<div className="mt-4 bg-gray-100 rounded-lg p-y w-[300px] h-[700px]">
				</div>
			</div>
		</>
		// <div className="flex">
		// 	<div>
		// 		<p>{name} @{username}</p>
		// 		<form onSubmit={handleSubmit}>
		// 			<input type="text" placeholder="Add Tweet" name="body" onChange={e => setBody(e.target.value)} /> <br /> <br />
		// 			<button type="submit">Add Tweet</button>
		// 		</form>
		// 		<button onClick={handleLogout}>Logout</button><br /><br/>
		// 		<button onClick={handleProfilePage}>Profile</button>
		// 	</div>
		// 	<div className="ml-[30px]">
		// 		{tweets ? tweets.map(tweet => (
		// 			<div key={tweet._id}>
		// 				<p>{tweet.body}</p>
		// 				<button className="bg-slate-700 rounded-md p-2 text-white" onClick={() => handleLikeTweet(tweet._id)}>Like Tweet</button>
		// 			</div>
		// 		)) : null}
		// 	</div>
		// </div>
	)
}

export default LoggedInHome
