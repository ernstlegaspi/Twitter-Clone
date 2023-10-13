import React, { useState } from 'react'

import moment from 'moment'

import { tweetCardIcons } from '../../constants'

import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'

const TweetCard = ({ tweet }) => {
	const date = moment(tweet.createdAt).fromNow()

	const cond = text => date.includes(text)
	
	const Buttons = (bgColor, color, Icon, text) => {
		const [hovered, setHovered] = useState(false)

		return (
			<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`${hovered ? `${color}` : 'text-gray-500'} flex items-center cursor-pointer`}>
				<div className={`${hovered ? `${bgColor}` : ''} w-max rounded-full p-2 transition-all`}>
					<Icon size={20} />
				</div>
				<p>{text}</p>
			</div>
		)
	}
	
	return (
		<div className="border-t border-color hover:bg-gray-100/50 cursor-pointer w-full transition-all py-2">
			<div className="flex w-[95%] mx-auto">
				<p className="bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-3">{tweet.name.charAt(0)}</p>
				<div className="w-full">
					<div className="flex">
						<p className="font-bold text-[15px]">{tweet.name}</p>
						<p className="text-gray-500 mx-1">@{tweet.username}</p>
						<p className="text-gray-500">· {
							cond("day ago") ? "Yesterday"
							: cond("hours ago") ? date.split(' ')[0] + "h" : cond("hour ago") ? 'an hour ago' 
							: cond('minutes') ? date.split(' ')[0] + "m" : cond('minute') ? date.split(' ')[0].replace('a', '1') + "m"
							: cond('seconds') ? date : moment(tweet.createdAt).format('ll').includes(new Date().getFullYear()) ? moment(tweet.createdAt).format('MMM Do YYY').split('th')[0] : moment(tweet.createdAt).format('ll')
						}
						</p>
					</div>
					<p className="leading-5 text-slate-600">{tweet.body}</p>
					<div className="w-[90%] flex justify-between mt-3">
						{Buttons('bg-sky-500/10', 'text-sky-500', FaRegComment, '')}
						{Buttons('bg-green-400/10', 'text-green-400', AiOutlineRetweet, '')}
						{Buttons('bg-pink-500/10', 'text-pink-500', AiOutlineHeart, '')}
						{Buttons('bg-yellow-400/10', 'text-yellow-400', BsBookmark, '')}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TweetCard