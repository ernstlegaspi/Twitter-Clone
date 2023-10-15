import React, { useState, useTransition } from 'react'

import moment from 'moment'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { postFormBottomIcon } from '../../constants'
import { addComment, getCommentsByTweetId } from '../../api/api'
import { setComment } from '../../slices/tweet/tweetSlice'
import { toast } from 'react-hot-toast'

const CommentModal = ({ user, tweet, showCommentModal }) => {
	const [body, setBody] = useState('')
	const [disabled, setDisabled] = useState(true)
	// eslint-disable-next-line
	const [_, startTransition] = useTransition()
	const dispatch = useDispatch()

	const date = moment(tweet.createdAt).fromNow()

	const cond = text => date.includes(text)

	const handleSubmit = async e => {
		e.preventDefault()
		setDisabled(true)
		
		addComment({ tweetId: tweet._id, userId: user._id, name: user.name, username: user.username, body })
		.then(() => {
			setDisabled(false)
			setBody('')
			toast.success('Your comment was sent.')
		})

		const { data } = await getCommentsByTweetId(tweet._id)

		dispatch(setComment(data.result))
	}

	const handleBodyChange = e => {
		setBody(e.target.value)
		setDisabled(e.target.value === '' || e.target.value < 1)
	}
	
	return (
		<div className="bg-black/40 inset-0 w-full h-full absolute flex justify-center z-50">
			<form onSubmit={handleSubmit} className="bg-white w-[600px] h-max rounded-2xl mt-11 p-2">
				<div className="w-full flex justify-between items-center">
					<div onClick={() => startTransition(() => showCommentModal(false))} className="w-max p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
						<AiOutlineClose size={20} />
					</div>
					<p className="purple-text rounded-full w-max h-max py-1 px-4 cursor-pointer hover:bg-gray-200 font-semibold transition-all">Drafts</p>
				</div>
				<div className="relative mt-5 flex w-full">
					<div className="relative">
						<p className="border-8 border-white relative z-20 bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl">{tweet.name.charAt(0)}</p>
						<div className="absolute bg-gray-300 w-[2px] top-0 ml-[25px] h-full"></div>
					</div>
					<div className="w-full ml-1 pr-3">
						<div className="flex items-center">
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
						<div className="w-full">
							<p className="leading-5 text-gray-600 mb-4">{tweet.body}</p>
						</div>
					</div>
				</div>
				<div className="flex">
					<p className="border-8 border-white relative z-20 bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl">{user.name.charAt(0)}</p>
					<textarea value={body} onChange={e => handleBodyChange(e)} className="resize-none w-full outline-0 ml-1 text-gray-600 h-[200px] pt-3" placeholder="Post your reply"></textarea>
				</div>
				<div className="flex items-center justify-between mt-3">
					<div className="flex items-center">
						{postFormBottomIcon.map((icon, index) => (
							<div key={index} className="rounded-full w-max hover:bg-gray-100 cursor-pointer transition-all purple-text p-2">
								<icon.icon size={20} />
							</div>
						))}
					</div>
					<button disabled={disabled} type="submit" className={`font-bold text-white rounded-full ${disabled ? 'purple-button' : 'bg-indigo-600'} ${disabled ? '' : 'hover:bg-indigo-800'} transition-all py-[6px] px-5`}>Post</button>
				</div>
			</form>
		</div>
	)
}

export default CommentModal