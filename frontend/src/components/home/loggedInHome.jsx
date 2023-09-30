import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../slices/auth/authSlice'
import { setTweet } from '../../slices/tweet/tweetSlice'
import { addTweet, getAllTweets } from '../../api/api'
import { useNavigate } from 'react-router-dom'

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

	const handleProfile = () => {
		navigate(username)
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
			<div className="flex">
				<div>
					<p>{name} @{username}</p>
					<form onSubmit={handleSubmit}>
						<input type="text" placeholder="Add Tweet" name="body" onChange={e => setBody(e.target.value)} /> <br /> <br />
						<button type="submit">Add Tweet</button>
					</form>
					<button onClick={handleLogout}>Logout</button><br /><br/>
					<button onClick={handleProfile}>Profile</button>
				</div>
				<div className="ml-[30px]">
					{tweets ? tweets.map(tweet => (
						<p key={tweet._id}>{tweet.body}</p>
					)) : null}
				</div>
			</div>
		</>
	)
}

export default LoggedInHome