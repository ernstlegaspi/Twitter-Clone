import React from 'react'

import { motion } from 'framer-motion'
import { AiOutlineRetweet } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setTweets } from '../../slices/tweet/tweetSlice'
import { getAllTweets, retweet, undoRetweet } from '../../api/api'

const RetweetCard = ({ hasUserRetweeted, setRetweetClicked, tweet, user }) => {
	const dispatch = useDispatch()

	const handleClick = async () => {
		setRetweetClicked(false)

		if(hasUserRetweeted.current) {
			hasUserRetweeted.current = false

			try {
				await undoRetweet({ id: tweet._id, userId: user._id })
			}
			catch(error) {
				hasUserRetweeted.current = true
			}
		}
		else {
			await retweet({ id: tweet._id, userId: user._id })
		}
		
		const { data } = await getAllTweets()

		dispatch(setTweets(data.result))
	}

	return (
		<div className="absolute bg-black/40 inset-0 flex items-center justify-center">
			<motion.div initial={{ height: 0 }} animate={{ height: 83 }} transition={{ duration: .01 }} className="transition-all bg-white rounded-md shadow shadow-black/40 w-[300px]">
				<div onClick={handleClick} className="border rounded-t flex items-center justify-center py-2 hover:bg-gray-100/50 cursor-pointer transition-all">
					<AiOutlineRetweet />
					<p className="font-semibold ml-1">{hasUserRetweeted.current ? 'Undo repost' : 'Repost'}</p>
				</div>
				<button onClick={() => setRetweetClicked(false)} className="font-semibold w-full border-t-0 border rounded-b flex items-center justify-center py-2 hover:bg-gray-100/50 cursor-pointer transition-all">Cancel</button>
			</motion.div>
		</div>
	)
}

export default RetweetCard