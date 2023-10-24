import React, { useEffect, useState, useRef } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'
import { PulseLoader } from 'react-spinners'

import { followUser, getFollowing, getPinnedTweet, getTweetsByUsername, getUserByUsername, getUserLikedTweets, unfollowUser } from '../../api/api'
import { setPinnedTweet, setTweets } from '../../slices/tweet/tweetSlice'
import TweetCard from '../cards/tweetCard'

const ProfilePage = () => {
	const [postTab, setPostTab] = useState(true)
	const [repliesTab, setRepliesTab] = useState(false)
	const [highlightsTab, setHighlightsTab] = useState(false)
	const [mediaTab, setMediaTab] = useState(false)
	const [likesTab, setLikesTab] = useState(false)
	const [loading, setLoading] = useState(false)
	const [isFollowing, setIsFollowing] = useState(false)
	const [hasFollowed, setHasFollowed] = useState(false)
	const [pinnedTweetLoading, setPinnedTweetLoading] = useState(false)
	const [followingHover, setFollowingHover] = useState(false)
	const params = useParams()
	const dispatch = useDispatch()
	const tweets = useSelector(state => state.tweet.tweets)
	const pinnedTweet = useSelector(state => state.tweet.pinnedTweet)
	const user = useRef(undefined)
	const currentUser = JSON.parse(localStorage.getItem('userInfo'))
	const sameUser = currentUser?.id === user.current?._id
	const navigate = useNavigate()
	
	let noTweets = !tweets || Object.keys(tweets).length === 0 || tweets.length === 0

	useEffect(() => {
		const userByUsername = async () => {
			const { data } = await getUserByUsername(params.username)
			
			user.current = data.result

			setPinnedTweetLoading(true)

			const res = await getPinnedTweet(user.current._id)

			dispatch(setPinnedTweet(res.data.result.pinnedTweet))

			setPinnedTweetLoading(false)
		}

		userByUsername()

		const getUserFollowing = async () => {
			const { data } = await getFollowing(currentUser?.id)

			const followingUsers = data.result.following.filter(following => following._id === user.current?._id)

			if(followingUsers[0]) {
				setHasFollowed(true)
			}
		}

		getUserFollowing()

		const getAllTweetsByUser = async () => {
			const { data } = await getTweetsByUsername(params.username)

			dispatch(setTweets(data.result.tweets.reverse()))
		}

		getAllTweetsByUser()
	}, [params?.username, dispatch, currentUser?.id])

	const handleActiveTab = (post, replies, highlights, media, likes) => {
		setPostTab(post)
		setRepliesTab(replies)
		setHighlightsTab(highlights)
		setMediaTab(media)
		setLikesTab(likes)
	}

	const handlePostButton = async () => {
		if(postTab) return
		
		handleActiveTab(true, false, false, false, false)
		setLoading(true)

		const { data } = await getTweetsByUsername(params.username)

		setLoading(false)

		dispatch(setTweets(data.result))
	}

	const handleLikesButton = async () => {
		if(likesTab) return
		
		handleActiveTab(false, false, false, false, true)
		setLoading(true)

		getUserLikedTweets(params.username)
		.then(({ data }) => {
			setLoading(false)
			dispatch(setTweets(data.result))
		})
	}

	const handleProfileClick = async () => {
		if(!isFollowing && !hasFollowed) {
			try {
				await followUser({ userId: currentUser?.id, otherUserId: user.current?._id})
			}
			catch(e) {
				setIsFollowing(false)
			}

			return
		}

		try {
			await unfollowUser({ userId: currentUser?.id, otherUserId: user.current?._id})
		}
		catch(e) {
			setIsFollowing(true)
			setHasFollowed(true)
		}
	}

	const formattedText = (bold, normal) => <div className="flex items-center cursor-pointer hover:underline">
		<p className="font-semibold mr-1">{bold}</p>
		<p className="text-gray-500">{normal}</p>
	</div>

	const menu = (onClick, text, isActive, width) => <div onClick={onClick} className="px-5 flex-grow relative h-[57px] cursor-pointer hover:bg-gray-200 transition all flex flex-col items-center justify-end">
		<div className={`flex items-center justify-center h-full ${isActive ? 'font-bold' : ''}`}>{text}</div>
		{isActive ? <div className={`absolute mt-[-5px] bg-indigo-500 rounded-full h-[5px] ${width}`}></div> : null}
	</div>

	return (
		<div className="h-full feed-scroll w-[600px] border border-y-0 border-color">
			{!user.current || loading ? <div className="w-full pt-10 flex items-center justify-center"><PulseLoader size={10} color="#0EA5E9" /></div> : (
				<>
					<div className="flex items-center py-1 px-2">
						<div onClick={() => navigate('/')} className="cursor-pointer transition-all hover:bg-gray-200 rounded-full w-max h-max p-2 mr-3">
							<FiArrowLeft size={20} />
						</div>
						<div className="flex justify-between items-center w-full">
							<div>
								<div className="flex items-center">
									<p className="mr-1 font-semibold text-xl">{user.current?.name}</p>
									<p className="mt-1 text-gray-500 text-sm">@{user.current?.username}</p>
								</div>
								<p className="text-gray-500 text-sm">{user.current?.tweets?.length} {user.current?.tweets?.length < 2 ? "post" : "posts"}</p>
							</div>
							<div className="flex items-center text-gray-500 text-sm">
								<AiOutlineCalendar size={18} />
								<p className="ml-1">Joined {moment(user.current?.createdAt).format('LL').split(' ')[0]} {moment(user.current?.createdAt).format('LL').split(' ')[2]}</p>
							</div>
						</div>
					</div>
					<div className="relative w-full">
						<div className="bg-gray-400/70 w-full h-[190px]"></div>
						<div className="z-10 absolute w-full mt-[-70px]">
							<div className="px-3 flex justify-between items-center">
								<div className="flex items-center">
									<div className="p-[5px] bg-white rounded-full">
										<p className="w-[121px] py-2 text-[70px] text-center bg-indigo-600 rounded-full text-white">{user.current?.name.charAt(0)}</p>
									</div>
								</div>
								<div onMouseEnter={() => setFollowingHover(true)} onMouseLeave={() => setFollowingHover(false)} onClick={() => {
									setIsFollowing(prev => !prev)
									
									if(isFollowing) setHasFollowed(false)
									
									handleProfileClick()
								}} className={`${hasFollowed && followingHover ? 'text-red-500 border border-red-200 hover:bg-red-200/50' : hasFollowed || sameUser || (!sameUser && isFollowing) ? 'border border-color hover:bg-gray-200' : 'hover:bg-black/75 bg-black text-white'} font-semibold rounded-full py-[5px] px-4 cursor-pointer transition-all  mt-[70px]`}>
									{isFollowing && followingHover ? 'Unfollow' : isFollowing || hasFollowed ? 'Following' : sameUser ? 'Edit profile' : 'Follow'}
								</div>
							</div>
							<div className="ml-3 flex items-center mt-2 justify-between w-[165px]">
								{formattedText(user.current?.following?.length, "Following")}
								{formattedText(user.current?.followers?.length, user.current?.followers?.length < 2 ? "Follower" : "Followers")}
							</div>
							<div className='flex justify-between items-center mt-3 border-b border-color'>
								{menu(handlePostButton, "Posts", postTab, 'w-[60px]')}
								{menu(() => {}, "Replies", repliesTab, 'w-[70px]')}
								{menu(() => {}, "Highlights", highlightsTab, 'w-[90px]')}
								{menu(() => {}, "Media", mediaTab, 'w-[60px]')}
								{menu(handleLikesButton, "Likes", likesTab, 'w-[50px]')}
							</div>
						</div>
					</div>
					<div className="mt-[162px]">
						{noTweets ? null : loading || !user.current || pinnedTweetLoading ? <div className="w-full pt-10 flex items-center justify-center"><PulseLoader color="#0EA5E9" /></div> : (
							<>
								{!pinnedTweet ? null : <TweetCard isPinnedTweet={true} user={user.current} tweet={pinnedTweet} />}
								{pinnedTweet ? tweets.map((tweet, idx) => tweet._id !== pinnedTweet._id ? <TweetCard user={user.current} key={idx} tweet={tweet} /> : null) : tweets.map((tweet, idx) => <TweetCard user={user.current} key={idx} tweet={tweet} />)}
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default ProfilePage