import React, { useEffect, useRef } from 'react'

import { FiArrowLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

import TweetCard from '../cards/tweetCard'
// import { getCommentsByTweetId, getSingleTweet } from '../../api/api'
import { getSingleTweet } from '../../api/api'
import { setTweet } from '../../slices/tweet/tweetSlice'
// import { setComment, setTweet } from '../../slices/tweet/tweetSlice'

const TweetPage = ({ user }) => {
	const dispatch = useDispatch()
	const tweet = useSelector(state => state.tweet.tweet)
	const comments = useSelector(state => state.tweet.comments)
	const tweetExisting = useRef(true)
	const isLoading = useRef(false)
	const commentsLoading = useRef(false)
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		isLoading.current = true

		const singleTweet = async () => {
			try {
				const { data } = await getSingleTweet(id)

				dispatch(setTweet(data.result))
				isLoading.current = false
			}
			catch(error) {
				tweetExisting.current = false
			}
		}

		singleTweet()

		const commentsByTweetId = async () => {
			// commentsLoading.current = true

			// try {
			// 	const { data } = await getCommentsByTweetId(tweet._id)

			// 	dispatch(setComment(data.result))
			// 	commentsLoading.current = false
			// }
			// catch(error) {
			// 	commentsLoading.current = true
			// }
		}

		commentsByTweetId()
	}, [dispatch, tweet?._id, id])

	return (
		<div className="h-full w-[600px] border border-y-0 border-color">
			{!tweetExisting.current ? <div className="h-full w-full flex items-center justify-center">
				<p className="text-gray-400 text-xl font-semibold">No tweet retrieved</p>
			</div> : (
				<>
					<div className="flex items-center py-1 px-2">
						<div onClick={() => navigate('/')} className="cursor-pointer transition-all hover:bg-gray-200 rounded-full w-max h-max p-2 mr-3">
							<FiArrowLeft size={20} />
						</div>
						<p className="font-bold text-xl">Post</p>
					</div>
					{isLoading.current || !tweet || !user ? <div className="w-full h-[90%] flex items-center justify-center"><PulseLoader size={10} color="#0EA5E9" /></div> : <TweetCard tweet={tweet} user={user} />}
					{!comments || commentsLoading.current ? <div className="w-full h-[90%] flex items-center justify-center"><PulseLoader size={10} color="#0EA5E9" /></div> : (
						<>
							{comments.map(comment => <TweetCard key={comment._id} isComment={true} tweet={comment} user={user} />)}
						</>
					)}
				</>
			)}
		</div>
	)
}

export default TweetPage