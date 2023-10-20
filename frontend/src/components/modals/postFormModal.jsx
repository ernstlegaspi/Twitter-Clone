import React, { useState, useTransition } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import { postFormBottomIcon } from '../../constants'
import { addTweet, addTweetIdToUser, getAllTweets } from '../../api/api'
import { setTweets } from '../../slices/tweet/tweetSlice'
import { toast } from 'react-hot-toast'

const PostForm = ({ showPostForm }) => {
	const [body, setBody] = useState('')
	const [disabled, setDisabled] = useState(true)
	// eslint-disable-next-line
	const [_, startTransition] = useTransition()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.user)

	const handleSubmit = async e => {
		e.preventDefault()

		setDisabled(true)

		const { data } = await addTweet({ body, name: user.name, username: user.username, userId: user._id })

		setDisabled(false)
		setBody('')
		toast.success('Tweet Added')

		await addTweetIdToUser({ id: data.result._id, userId: user._id })

		const res = await getAllTweets()
		
		dispatch(setTweets(res.data.result))
	}

	const handleBodyChange = e => {
		setBody(e.target.value)
		setDisabled(e.target.value === '' || e.target.value.length < 1)
	}

	return (
		<div className="bg-black/40 inset-0 w-full h-full absolute flex justify-center">
			<form onSubmit={handleSubmit} className="bg-white w-[600px] h-[315px] rounded-2xl mt-11 p-2">
				<div className="w-full flex justify-between items-center">
					<div onClick={() => startTransition(() => showPostForm(false))} className="w-max p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
						<AiOutlineClose size={20} />
					</div>
					<p className="purple-text rounded-full w-max h-max py-1 px-4 cursor-pointer hover:bg-gray-200 font-semibold transition-all">Drafts</p>
				</div>
				<div className="mt-5 flex w-full border-b border-gray-200/60 h-[65%]">
					<p className="bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-3">{user.name.charAt(0)}</p>
					<div className="w-full">
						<div className="cursor-pointer rounded-full w-max px-4 border border-color">
							<p className="purple-text text-[15px] font-semibold">Everyone</p>
						</div>
						<textarea value={body} onChange={e => handleBodyChange(e)} className="h-[80%] mt-3 resize-none outline-none w-full" placeholder="What is happening?!"></textarea>
					</div>
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

export default PostForm