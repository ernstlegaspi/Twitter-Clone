import React from 'react'

import { SyncLoader } from 'react-spinners'

import TweetCard from '../../cards/tweetCard'

const HomeContent = ({ tweets }) => {
	// if() return 
	
	return (
		<div className="h-full w-[600px] border border-y-0 border-color">
			<div className="w-full flex">
				<div className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center">
					<p className="py-3 w-max font-bold border-b-[3px] purple-border m-auto">For you</p>
				</div>
				<div className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center homepage-text-color">
					<p>Following</p>
				</div>
			</div>
			<div className="h-[860px] w-full feed-scroll">
				{!tweets || Object.keys(tweets).length === 0 || tweets.length === 0 ? <div className="w-full h-full flex items-center justify-center">
					<SyncLoader size={12} color="#0EA5E9" />
				</div> : tweets.map(tweet => (
					<TweetCard key={tweet._id} tweet={tweet} />
				))}
			</div>
		</div>
	)
}

export default HomeContent