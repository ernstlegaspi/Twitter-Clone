import React, { useEffect } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'

import { getTweetsByUsername, getUserLikedTweets } from '../../api/api'
import { setTweet } from '../../slices/tweet/tweetSlice'
import TweetCard from '../cards/tweetCard'

const ProfilePage = ({ user }) => {
	const params = useParams()
	const dispatch = useDispatch()
	const tweets = useSelector(state => state.tweet.tweets)
	
	let noTweets = !tweets || Object.keys(tweets).length === 0 || tweets.length === 0

	useEffect(() => {
		const getUserTweets = async () => {
			const { data } = await getTweetsByUsername(params.username)

			dispatch(setTweet(data.result))
		}

		getUserTweets()
	}, [params.username, dispatch])

	// const handleCheckLikedTweets = async () => {
	// 	dispatch(setTweet(null))

	// 	const { data } = await getUserLikedTweets(params.username)

	// 	dispatch(setTweet(data.result))
	// }

	if(!user) return null

	const formattedText = (bold, normal) => <div className="flex items-center cursor-pointer hover:underline">
		<p className="font-semibold mr-1">{bold}</p>
		<p className="text-gray-500">{normal}</p>
	</div>

	const menu = (onClick, text, isActive, width) => <div onClick={onClick} className="px-5 flex-grow relative h-[57px] cursor-pointer hover:bg-gray-200 transition all flex flex-col items-center justify-end">
		<div className={`flex items-center justify-center h-full ${isActive ? 'font-bold' : ''}`}>{text}</div>
		{isActive ? <div className={`absolute mt-[-5px] bg-indigo-500 rounded-full h-[5px] ${width}`}></div> : null}
	</div>

	return (
		<div className="h-full w-[600px] border border-y-0 border-color">
			<div className="flex items-center py-1 px-2">
				<div className="cursor-pointer transition-all hover:bg-gray-200 rounded-full w-max h-max p-2 mr-3">
					<FiArrowLeft size={20} />
				</div>
				<div className="flex justify-between items-center w-full">
					<div>
						<div className="flex items-center">
							<p className="mr-1 font-semibold text-xl">{user.name}</p>
							<p className="mt-1 text-gray-500 text-sm">@{user.username}</p>
						</div>
						<p className="text-gray-500 text-sm">{user.tweetCount} {user.tweetCount < 2 ? "post" : "posts"}</p>
					</div>
					<div className="flex items-center text-gray-500 text-sm">
						<AiOutlineCalendar size={18} />
						<p className="ml-1">Joined {moment(user.createdAt).format('LL').split(' ')[0]} {moment(user.createdAt).format('LL').split(' ')[2]}</p>
					</div>
				</div>
			</div>
			<div className="relative w-full">
				<div className="bg-gray-400/70 w-full h-[190px]"></div>
				<div className="z-10 absolute w-full mt-[-70px]">
					<div className="px-3 flex justify-between items-center">
						<div className="flex items-center">
							<div className="p-[5px] bg-white rounded-full">
								<p className="w-[121px] py-2 text-[70px] text-center bg-indigo-600 rounded-full text-white">{user.name.charAt(0)}</p>
							</div>
						</div>
						<div className="font-semibold border border-color rounded-full py-[5px] px-4 cursor-pointer transition-all hover:bg-gray-200 mt-[70px]">Edit profile</div>
					</div>
					<div className="ml-3 flex items-center mt-2 justify-between w-[165px]">
						{formattedText(user.following, "Following")}
						{formattedText(user.followers, user.followers < 2 ? "Follower" : "Followers")}
					</div>
					<div className={`flex justify-between items-center mt-3 ${noTweets ? 'border-b' : ''} border-color`}>
						{menu(() => {}, "Posts", true, 'w-[60px]')}
						{menu(() => {}, "Replies", false, 'w-[70px]')}
						{menu(() => {}, "Highlights", false, 'w-[90px]')}
						{menu(() => {}, "Media", false, 'w-[60px]')}
						{menu(() => {}, "Likes", false, 'w-[50px]')}
					</div>
				</div>
			</div>
			<div className="mt-[162px] relative z-20">
				{noTweets ? null : (
					tweets.map(tweet => <TweetCard key={tweet._id} tweet={tweet} />)
				)}
			</div>
		</div>
		// <div className="flex">
		// 	<div>
		// 		<button onClick={handleCheckLikedTweets}>Checked liked tweets</button>
		// 	</div>
		// 	<div className="ml-5">
		// 		<div>{tweets ? tweets.map(tweet => (
		// 			<div key={tweet._id}>
		// 				<p>{tweet.username}</p>
		// 				<p>{tweet.body}</p>
		// 				<p>{tweet.name}</p>
		// 			</div>
		// 		)) : null}</div>
		// 	</div>
		// </div>
	)
}

export default ProfilePage