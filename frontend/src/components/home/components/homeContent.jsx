import React from 'react'

import { SyncLoader } from 'react-spinners'

import TweetCard from '../../cards/tweetCard'

const HomeContent = ({ tweets, user }) => {
	return (
		<div className="h-full w-[600px] border border-y-0 border-color">
			<div className="w-full flex border-b border-color">
				<div className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center">
					<p className="py-3 w-max font-bold border-b-[3px] purple-border m-auto">For you</p>
				</div>
				<div className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center homepage-text-color">
					<p>Following</p>
				</div>
			</div>
			<div className="h-[800px] w-full feed-scroll">
				{!tweets || Object.keys(tweets).length === 0 || tweets.length === 0 ? <div className="w-full h-full flex items-center justify-center">
					<SyncLoader size={12} color="#0EA5E9" />
				</div> : tweets.map(tweet => (
					<div key={tweet._id}>
						{tweet.userId !== user._id && tweet.tweetId.length > 0 ? null : <TweetCard tweet={tweet} user={user} />}
					</div>
				))}
			</div>
		</div>
	)
}

export default HomeContent