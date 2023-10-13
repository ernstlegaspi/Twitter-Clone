import React, { useEffect, useState, useRef } from 'react'

import moment from 'moment'

import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { likeTweet } from '../../api/api'

const TweetCard = ({ tweet }) => {
	const currentHeartIcon = useRef(AiOutlineHeart)
	const currentLikeCount = useRef(0)

	const [isLiked, setIsLiked] = useState(false)

	const user = useSelector(state => state.user.user)

	const date = moment(tweet.createdAt).fromNow()

	const cond = text => date.includes(text)

	const Buttons = (onClick, bgColor, color, Icon, isActive, text) => {
		const [hovered, setHovered] = useState(false)

		return (
			<div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`${hovered || isActive ? `${color}` : 'text-gray-500'} flex items-center cursor-pointer`}>
				<div className={`${hovered ? `${bgColor}` : ''} w-max rounded-full p-2 transition-all`}>
					<Icon size={20} />
				</div>
				<p>{text}</p>
			</div>
		)
	}

	const handleHeartButton = async () => {
		const { data } = await likeTweet({ id: tweet._id, userId: user._id })
		const userId = data.result.likedUserId.map(usersId => usersId === user._id)

		if(userId) {
			currentHeartIcon.current = AiFillHeart
			currentLikeCount.current = data.result.likedUserId.length
			setIsLiked(true)
		}
	}

	useEffect(() => {
		const userId = tweet.likedUserId.map(usersId => usersId === user._id)
		
		if(userId[0]) {
			currentHeartIcon.current = AiFillHeart
			currentLikeCount.current = tweet.likedUserId.length
			setIsLiked(true)
		}
	}, [tweet.likedUserId, tweet._id, user._id])
	
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
						{Buttons(() => {}, 'bg-sky-500/10', 'text-sky-500', FaRegComment, false, '')}
						{Buttons(() => {}, 'bg-green-400/10', 'text-green-400', AiOutlineRetweet, false, '')}
						{Buttons(handleHeartButton, 'bg-pink-500/10', 'text-pink-500', currentHeartIcon.current, isLiked, currentLikeCount.current < 1 ? '' : currentLikeCount.current)}
						{Buttons(() => {}, 'bg-yellow-400/10', 'text-yellow-400', BsBookmark, false, '')}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TweetCard