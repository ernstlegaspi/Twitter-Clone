import React, { lazy, Suspense, useEffect, useState, useRef, useTransition } from 'react'

import moment from 'moment'

import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'

import { useNavigate, useParams } from 'react-router-dom'

import { likeTweet, unlikeTweet } from '../../api/api'
import { PulseLoader } from 'react-spinners'
import RetweetCard from './RetweetCard'

const CommentModal = lazy(() => import('../modals/commentModal'))

const TweetCard = ({ tweet, user, isComment = false }) => {
	// eslint-disable-next-line
	const [_, startTransition] = useTransition()
	const buttonsHovered = useRef(false)
	const [showCommentModal, setShowCommentModal] = useState(false)
	const hasUserRetweeted = useRef(false)
	const [retweetClick, setRetweetClicked] = useState()
	const currentHeartIcon = useRef(AiOutlineHeart)
	const [currentCommentCount, setCurrentCommentCount] = useState(tweet.commentsCount)
	const currentLikeCount = useRef(0)
	const { id } = useParams()
	const navigate = useNavigate()

	const [isLiked, setIsLiked] = useState(false)

	const date = moment(tweet.createdAt).fromNow()

	const cond = text => date.includes(text)

	const Buttons = (onClick, bgColor, color, Icon, isActive, text, canBeHovered = true) => {
		const [hovered, setHovered] = useState(false)

		return (
			<div onClick={!canBeHovered ? null : onClick} onMouseEnter={() => {
				setHovered(true)
				buttonsHovered.current = true
			}} onMouseLeave={() => {
				setHovered(false)
				buttonsHovered.current = false
			}} className={`${!canBeHovered ? 'text-gray-300' : hovered || isActive ? `${color}` : 'text-gray-500'} flex items-center cursor-pointer`}>
				<div className={`${!canBeHovered ? '' : hovered ? `${bgColor}` : ''} w-max rounded-full p-2 transition-all`}>
					<Icon size={20} />
				</div>
				<p>{text}</p>
			</div>
		)
	}

	const handleHeartButton = async () => {
		if(isLiked) {
			const unlike = await unlikeTweet({ id: tweet._id, userId: user._id })
			
			if(unlike.data.message !== 'Successfully unliked tweet') return

			currentHeartIcon.current = AiOutlineHeart
			currentLikeCount.current--
			setIsLiked(false)

			return
		}

		// Like Tweet logic
		const { data } = await likeTweet({ id: tweet._id, userId: user._id })
		const userId = data.result.likedUserId.filter(usersId => usersId === user._id)

		if(!userId) return

		currentHeartIcon.current = AiFillHeart
		currentLikeCount.current = data.result.likedUserId.length
		setIsLiked(true)
	}

	useEffect(() => {
		if(!user) return
		
		const userId = tweet.likedUserId.filter(usersId => usersId === user._id)

		tweet.retweetUserId.map(retweetId => {
			if(retweetId === user._id) {
				hasUserRetweeted.current = true

				return true
			}

			return false
		})

		setCurrentCommentCount(tweet.commentsCount)

		if(userId[0]) {
			currentHeartIcon.current = AiFillHeart
			currentLikeCount.current = tweet.likedUserId.length
			setIsLiked(true)
			
			return
		}

		currentLikeCount.current = tweet.likedUserId.length
	}, [user, tweet?.likedUserId, tweet?.retweetUserId, tweet?.commentsCount, tweet?._id, user?._id])

	return (
		<>
			<div id="tweet-card" onClick={() => (id && !isComment) || (isComment && buttonsHovered.current) || (window.location.pathname === '/' && buttonsHovered.current) ? null : navigate(`/${tweet.username}/status/${tweet.uniqueId}`)} className={`${tweet.nestedComments.length < 1 || (tweet.nestedComments.length > 0  && window.location.pathname === '/') ? 'border-b' : ''} border-color ${id && !isComment ? '' : 'hover:bg-gray-100/50'} ${id && !isComment ? '' : 'cursor-pointer'} w-full transition-all pt-2`}>
				<div className="flex w-full">
					<div>
						{hasUserRetweeted.current ? <div className="flex justify-end w-full text-gray-500 pr-2 pt-[3px]">
							<AiOutlineRetweet />
						</div> : null}
						<p className="border-8 border-white bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-1">{tweet.name.charAt(0)}</p>
						{tweet.nestedComments.length < 1 || (tweet.nestedComments.length > 0  && window.location.pathname === '/') ? null : <div className="absolute bg-gray-300 w-[2px] top-0 ml-[26px] h-full"></div>}
					</div>
					<div className="w-full">
						{hasUserRetweeted.current ? <p className="text-[12px] text-gray-500 font-bold">You reposted</p> : null}
						<div className={`flex ${id && !isComment ? 'flex-col' : ''}`}>
							<p className="font-bold text-[15px] text-gray-700">{tweet.name}</p>
							<p className={`text-gray-500 ${id && !isComment ? 'mx-[-2px] text-sm' : 'mx-1'}`}>@{tweet.username}</p>
							{id && !isComment ? null : (
								<p className="text-gray-500">· {
									cond("day ago") ? "Yesterday"
									: cond("hours ago") ? date.split(' ')[0] + "h" : cond("hour ago") ? 'an hour ago' 
									: cond('minutes') ? date.split(' ')[0] + "m" : cond('minute') ? date.split(' ')[0].replace('a', '1') + "m"
									: cond('seconds') ? date : moment(tweet.createdAt).format('ll').includes(new Date().getFullYear()) ? moment(tweet.createdAt).format('MMM Do YYY').split('th')[0] : moment(tweet.createdAt).format('ll')
								}
								</p>
							)}
						</div>
						{id && !isComment ? null : (
							<>
								<p className="leading-5 text-slate-600">{tweet.body}</p>
								<div className="w-[90%] flex justify-between mt-3 mb-2">
									{Buttons(() => startTransition(() => setShowCommentModal(true)), 'bg-sky-500/10', 'text-sky-500', FaRegComment, false, currentCommentCount < 1 ? '' : currentCommentCount)}
									{Buttons(() => setRetweetClicked(prev => !prev), 'bg-green-400/10', 'text-green-400', AiOutlineRetweet, hasUserRetweeted.current, tweet.retweetUserId.length < 1 ? '' : tweet.retweetUserId.length, tweet.userId !== user._id)}
									{Buttons(handleHeartButton, 'bg-pink-500/10', 'text-pink-500', currentHeartIcon.current, isLiked, currentLikeCount.current < 1 ? '' : currentLikeCount.current)}
									{Buttons(() => {}, 'bg-yellow-400/10', 'text-yellow-400', BsBookmark, false, '')}
								</div>
							</>
						)}
					</div>
				</div>
				{id && !isComment ? (
					<div className="w-full">
						<div className="mt-3 mb-4 px-4">
							<p className="leading-5 text-black/70">{tweet.body}</p>
							<p className="mt-3 text-slate-500 text-[15px]">{moment(tweet.createdAt).format('LT')} · {moment(tweet.createdAt).format('ll')}</p>
						</div>
						<div className="w-full flex justify-between mt-3 mb-2 px-2 border-t border-color pt-2">
							{Buttons(() => startTransition(() => setShowCommentModal(true)), 'bg-sky-500/10', 'text-sky-500', FaRegComment, false, currentCommentCount < 1 ? '' : currentCommentCount)}
							{Buttons(() => {}, 'bg-green-400/10', 'text-green-400', AiOutlineRetweet, hasUserRetweeted.current, tweet.retweetUserId.length < 1 ? '' : tweet.retweetUserId.length, tweet.userId !== user._id)}
							{Buttons(handleHeartButton, 'bg-pink-500/10', 'text-pink-500', currentHeartIcon.current, isLiked, currentLikeCount.current < 1 ? '' : currentLikeCount.current)}
							{Buttons(() => {}, 'bg-yellow-400/10', 'text-yellow-400', BsBookmark, false, '')}
						</div>
					</div>
				) : null}
			</div>
			{showCommentModal ? <Suspense fallback={
				<div className="w-full h-full flex items-center justify-center">
					<PulseLoader size={12} color="#0EA5E9" />
				</div>
			}>
				<CommentModal currentCommentCount={setCurrentCommentCount} user={user} tweet={tweet} showCommentModal={setShowCommentModal} />
			</Suspense> : null}
			{retweetClick ? <Suspense fallback={<p>Loading...</p>}>
				<RetweetCard user={user} tweet={tweet} setRetweetClicked={setRetweetClicked} />
			</Suspense> : null}
		</>
	)
}

export default TweetCard
