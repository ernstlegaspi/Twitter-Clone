import React, { lazy, Suspense, useEffect, useState, useRef, useTransition } from 'react'

import moment from 'moment'

import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsBookmark, BsFillBookmarkFill, BsPin, BsPinFill, BsTrash } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'

import { useNavigate, useParams } from 'react-router-dom'

import { addBookmark, addNotification, deleteTweet, likeTweet, pinnedTweet, removeBookmark, removePinnedTweet, unlikeTweet } from '../../api/api'
import { PulseLoader } from 'react-spinners'
import RetweetCard from './RetweetCard'
import { setPinnedTweet } from '../../slices/tweet/tweetSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const CommentModal = lazy(() => import('../modals/commentModal'))

const TweetCard = ({ tweet, user, isComment = false, isPinnedTweet = false, isNotification = false }) => {
	// eslint-disable-next-line
	const [_, startTransition] = useTransition()
	const buttonsHovered = useRef(false)
	const [showDropdown, setShowDropdown] = useState(false)
	const [profileHovered, setProfileHovered] = useState(false)
	const [showCommentModal, setShowCommentModal] = useState(false)
	const [dropdownItemsHovered, setDropdownItemsHovered] = useState(false)
	const [deleteClicked, setDeleteClicked] = useState(false)
	const [hasUserRetweeted, setHasUserRetweeted] = useState(false)
	const hasPinnedTweet = useRef(false)
	const hasBookmark = useRef(false)
	const [retweetClick, setRetweetClicked] = useState()
	const currentHeartIcon = useRef(AiOutlineHeart)
	const currentBookmarkIcon = useRef(BsBookmark)
	const [currentCommentCount, setCurrentCommentCount] = useState(tweet.commentsCount)
	const currentLikeCount = useRef(0)
	const currentBookmarkCount = useRef(0)
	const { id, username } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

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

	const dropdownItem = (onClick, Icon, label, color) => (
		<div onMouseEnter={() => setDropdownItemsHovered(true)} onMouseLeave={() => setDropdownItemsHovered(false)} onClick={onClick} className={`hover:bg-gray-100/50 cursor-pointer transition-all w-full flex items-center ${color} px-4 py-2 z-50`}>
			<Icon size={15} />
			<p className="font-semibold mt-[-1px] ml-2">{label}</p>
		</div>
	)

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

		if(tweet.userId === user._id) return

		await addNotification(tweet.userId, 
			{
				message: tweet._id !== '' ? 'liked your reply' : 'liked your tweet',
				notificationType: 'Like',
				body: tweet.body,
				name: user.name,
				username: user.username
			}
		)
	}

	const handlePinnedTweet = async () => {
		let res = null
		
		if(tweet._id !== user.pinnedTweet) {
			try {
				res = await pinnedTweet({ tweetId: tweet._id, userId: user._id })
				dispatch(setPinnedTweet(res.data.result.pinnedTweet))
			}
			catch(error) {
				toast.error('Error making this tweet pinned')
				hasPinnedTweet.current = false
				dispatch(setPinnedTweet(null))
			}

			return
		}

		try {
			res = await removePinnedTweet({ tweetId: tweet._id, userId: user._id })
			dispatch(setPinnedTweet(null))
		}
		catch(error) {
			toast.error('Error making undo pinned tweet')
			hasPinnedTweet.current = true
			dispatch(setPinnedTweet(res.data.result.pinnedTweet))
		}
	}

	const handleDeleteTweet = async () => {
		try {
			await deleteTweet({ tweetId: tweet._id, userId: user._id })
		}
		catch(error) {
			toast.error('Error deleting tweet')
			setDeleteClicked(false)
		}
	}

	const handleBookmark = async () => {
		if(!hasBookmark.current) {
			try {
				hasBookmark.current = true

				await addBookmark({ tweetId: tweet._id, userId: user._id })

				toast.success('Tweet bookmarked')
			}
			catch(error) {
				toast.error('Can not bookmark tweet')
				hasBookmark.current = false
				currentBookmarkIcon.current = BsBookmark
			}
			
			return
		}

		try {
			hasBookmark.current = false

			await removeBookmark({ tweetId: tweet._id, userId: user._id })

			toast.success('Tweet remove from bookmark')
		}
		catch(error) {
			hasBookmark.current = true
			toast.success('Can not remove tweet from bookmark')
		}
	}

	useEffect(() => {
		if(!user) return

		const userBookmarked = user.bookmark.filter(bookmark => tweet._id === bookmark)
		
		currentBookmarkCount.current = tweet?.bookmarkCount
		
		if(userBookmarked[0]) {
			currentBookmarkIcon.current = BsFillBookmarkFill
			hasBookmark.current = true
		}

		const retweet = tweet.retweetUserId.filter(retweetId => retweetId === user._id)

		if(retweet[0]) setHasUserRetweeted(true)

		setCurrentCommentCount(tweet.commentsCount)

		const userId = tweet.likedUserId.filter(usersId => usersId === user._id)

		if(userId[0]) {
			currentHeartIcon.current = AiFillHeart
			currentLikeCount.current = tweet.likedUserId.length
			setIsLiked(true)
			
			return
		}

		currentLikeCount.current = tweet.likedUserId.length
	}, [hasUserRetweeted, user, tweet?.likedUserId, tweet?.bookmarkCount, tweet?.retweetUserId, tweet?.commentsCount, tweet?._id, user?._id])

	return (
		<>
			<div id="tweet-card" onClick={() => 
				(buttonsHovered.current && window.location.pathname === '/bookmarks') 
				|| showDropdown
				|| profileHovered
				|| (id && !isComment)
				|| (username && !isComment && buttonsHovered.current)
				|| (isComment && buttonsHovered.current)
				|| (window.location.pathname === '/' && buttonsHovered.current) ? null
				: navigate(`/${tweet.username}/status/${tweet.uniqueId}`)}
				className={`${tweet.nestedComments.length < 1 || (tweet.nestedComments.length > 0  && window.location.pathname === '/') ? 'border-b' : ''} border-color ${(id && !isComment) || dropdownItemsHovered ? '' : 'hover:bg-gray-100/50'} ${id && !isComment ? '' : 'cursor-pointer'} ${deleteClicked ? 'hidden' : ''} w-full transition-all pt-2`}>
				<div className="flex w-full">
					<div>
						{hasUserRetweeted || tweet._id === user.pinnedTweet || hasPinnedTweet.current || isPinnedTweet ? <div className="flex justify-end w-full text-gray-500 pr-2 pt-[3px]">
							{hasUserRetweeted ? <AiOutlineRetweet /> : <BsPinFill />}
						</div> : null}
						<p onMouseEnter={() => {
							setProfileHovered(true)
						}} onMouseLeave={() => setProfileHovered(false)} onClick={() => navigate(`/${tweet?.username}/`)} 
						className="border-8 border-white bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-1">{tweet.name.charAt(0)}</p>
						{tweet.nestedComments.length < 1 || (tweet.nestedComments.length > 0  && window.location.pathname === '/') ? null : <div className="absolute bg-gray-300 w-[2px] top-0 ml-[26px] h-full"></div>}
					</div>
					<div className="w-full relative">
						{tweet._id === user.pinnedTweet || hasPinnedTweet.current || isPinnedTweet || hasUserRetweeted ? <p className="text-sm text-gray-500 font-bold">{hasUserRetweeted ? 'You reposted' : 'Pinned post'}</p> : null}
						<div className="w-full flex justify-between items-center relative">
							<div className={`flex ${id && !isComment ? 'flex-col' : ''}`}>
								<p onMouseEnter={() => {
									setProfileHovered(true)
								}} onMouseLeave={() => setProfileHovered(false)} onClick={() => navigate(`/${tweet?.username}/`)} className="cursor-pointer hover:underline font-bold text-[15px] text-gray-700">{tweet.name}</p>
								<p onMouseEnter={() => {
									setProfileHovered(true)
								}} onMouseLeave={() => setProfileHovered(false)} onClick={() => navigate(`/${tweet?.username}/`)} className={`cursor-pointer hover:underline text-gray-500 ${id && !isComment ? 'mx-[-2px] text-sm' : 'mx-1'}`}>@{tweet.username}</p>
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
							<div onMouseEnter={() => buttonsHovered.current = true} onMouseLeave={() => buttonsHovered.current = false} onClick={() => setShowDropdown(prev => !prev)} className="hover:bg-sky-300/25 rounded-full p-1 cursor-pointer transition-all mr-3 hover:text-sky-500">
								<BiDotsHorizontalRounded size={20} />
							</div>
							{showDropdown ? (
								<div className="absolute bg-white rounded-md shadow shadow-black/40 right-[18px] mt-[95px]">
									{dropdownItem(() => {
										setShowDropdown(false)
										setDeleteClicked(true)
										handleDeleteTweet()
									}, BsTrash, 'Delete', 'text-red-500')}
									{dropdownItem(() => {
										hasPinnedTweet.current = !hasPinnedTweet.current
										handlePinnedTweet()
									}, BsPin, tweet._id === user.pinnedTweet || hasPinnedTweet.current || isPinnedTweet ? 'Unpin from profile' : 'Pin to your profile', 'text-black')}
								</div>
							) : null}
						</div>
						{id && !isComment ? null : (
							<>
								{isNotification ? <p className="text-[15px] text-gray-500">Replying to <span onClick={() => {}} className="text-indigo-600 hover:underline cursor-pointer">{user.username}</span></p> : null}
								<p className="leading-5 text-slate-600">{tweet.body}</p>
								<div className="w-[90%] flex justify-between mt-3 mb-2">
									{Buttons(() => startTransition(() => setShowCommentModal(true)), 'bg-sky-500/10', 'text-sky-500', FaRegComment, false, currentCommentCount < 1 ? '' : currentCommentCount)}
									{Buttons(() => setRetweetClicked(prev => !prev), 'bg-green-400/10', 'text-green-400', AiOutlineRetweet, hasUserRetweeted, tweet.retweetUserId.length < 1 ? '' : tweet.retweetUserId.length, tweet.userId !== user._id)}
									{Buttons(handleHeartButton, 'bg-pink-500/10', 'text-pink-500', currentHeartIcon.current, isLiked, currentLikeCount.current < 1 ? '' : currentLikeCount.current)}
									{Buttons(() => {
										currentBookmarkCount.current = currentBookmarkIcon.current === BsBookmark ? currentBookmarkCount.current + 1 : currentBookmarkCount.current - 1
										currentBookmarkIcon.current = currentBookmarkIcon.current === BsBookmark ? BsFillBookmarkFill : BsBookmark
										handleBookmark()
									}, 'bg-yellow-400/10', 'text-yellow-400', currentBookmarkIcon.current, currentBookmarkIcon.current === BsFillBookmarkFill, currentBookmarkCount.current < 1 ? '' : currentBookmarkCount.current)}
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
							{Buttons(() => {}, 'bg-green-400/10', 'text-green-400', AiOutlineRetweet, hasUserRetweeted, tweet.retweetUserId.length < 1 ? '' : tweet.retweetUserId.length, tweet.userId !== user._id)}
							{Buttons(handleHeartButton, 'bg-pink-500/10', 'text-pink-500', currentHeartIcon.current, isLiked, currentLikeCount.current < 1 ? '' : currentLikeCount.current)}
							{Buttons(handleBookmark, 'bg-yellow-400/10', 'text-yellow-400', BsBookmark, false, '')}
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
				<RetweetCard hasUserRetweeted={hasUserRetweeted} user={user} tweet={tweet} setRetweetClicked={setRetweetClicked} />
			</Suspense> : null}
		</>
	)
}

export default TweetCard
