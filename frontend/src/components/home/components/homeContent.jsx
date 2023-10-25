import React, { useState } from 'react'

import { SyncLoader } from 'react-spinners'

import TweetCard from '../../cards/tweetCard'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowing } from '../../../api/api'
import { setFollowing } from '../../../slices/user/userSlice'

const HomeContent = ({ tweets, user }) => {
	const [isFollowingTab, setIsFollowingTab] = useState(false)
	const dispatch = useDispatch()
	const followingUsers = useSelector(state => state.user.following)

	const handleFollowingClick = async () => {
		const { data } = await getFollowing(user._id)

		dispatch(setFollowing(data.result.following))
	}

	const Loader = () => <div className="w-full h-full flex items-center justify-center">
		<SyncLoader size={12} color="#0EA5E9" />
	</div>

	return (
		<div className="h-full w-[600px] border border-y-0 border-color">
			<div className="w-full flex border-b border-color">
				<div onClick={() => setIsFollowingTab(false)} className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center">
					<p className={`${isFollowingTab ? 'text-gray-500' : 'text-black font-bold border-b-[3px] purple-border'} py-3 w-max m-auto`}>For you</p>
				</div>
				<div onClick={() => {
					setIsFollowingTab(true)
					handleFollowingClick()
				}} className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center">
					<p className={`${isFollowingTab ? 'text-black font-bold border-b-[3px] purple-border' : 'text-gray-500'} py-3 w-max m-auto`}>Following</p>
				</div>
			</div>
			<div className="h-[800px] w-full feed-scroll">
				{isFollowingTab ? !followingUsers || !tweets ? <Loader /> : tweets.map(tweet => {
					return followingUsers.map(following => following._id === tweet.userId ? <TweetCard tweet={tweet} user={user} /> : null)
				}) : !tweets || Object.keys(tweets).length === 0 || tweets.length === 0 ? <Loader /> : tweets.map(tweet => (
					<div key={tweet._id}>
						{(tweet.userId !== user._id && tweet.tweetId.length > 0) || tweet._id === user.pinnedTweet ? null : <TweetCard tweet={tweet} user={user} />}
					</div>
				))}
			</div>
		</div>
	)
}

export default HomeContent