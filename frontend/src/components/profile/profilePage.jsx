import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getTweetsByUsername, getUserLikedTweets } from '../../api/api'
import { setTweet } from '../../slices/tweet/tweetSlice'

const ProfilePage = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const tweets = useSelector(state => state.tweet.tweets)

	useEffect(() => {
		const getUserTweets = async () => {
			const { data } = await getTweetsByUsername(params.username)

			dispatch(setTweet(data.result))
		}

		getUserTweets()
	}, [params.username, dispatch])

	const handleCheckLikedTweets = async () => {
		dispatch(setTweet(null))

		const { data } = await getUserLikedTweets(params.username)

		dispatch(setTweet(data.result))
	}

	return (
		<div className="flex">
			<div>
				<button onClick={handleCheckLikedTweets}>Checked liked tweets</button>
			</div>
			<div className="ml-5">
				<div>{tweets ? tweets.map(tweet => (
					<div key={tweet._id}>
						<p>{tweet.username}</p>
						<p>{tweet.body}</p>
						<p>{tweet.name}</p>
					</div>
				)) : null}</div>
			</div>
		</div>
	)
}

export default ProfilePage