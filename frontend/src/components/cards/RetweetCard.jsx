import React from 'react'

import { motion } from 'framer-motion'
import { AiOutlineRetweet } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setTweets } from '../../slices/tweet/tweetSlice'
import { getAllTweets, retweet } from '../../api/api'

const RetweetCard = ({ setRetweetClicked, tweet, user }) => {
	const dispatch = useDispatch()

	const handleClick = async () => {
		setRetweetClicked(false)

		await retweet({ id: tweet._id, userId: user._id })
		
		const { data } = await getAllTweets()

		dispatch(setTweets(data.result))

	}

	return (
		<motion.div onClick={handleClick} initial={{ height: 0 }} animate={{ height: 42 }} transition={{ duration: .01 }} className="transition-all absolute bg-white rounded-md shadow shadow-black/40 mt-[-10px] ml-[11.5%]">
			<div className="flex items-center justify-center px-4 pt-2 hover:bg-gray-100/50 cursor-pointer transition-all">
				<AiOutlineRetweet />
				<p className="font-semibold ml-1">Repost</p>
			</div>
		</motion.div>
	)
}

export default RetweetCard