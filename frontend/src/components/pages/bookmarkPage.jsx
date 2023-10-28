import React, { useEffect } from 'react'
import { PulseLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { setBookmark } from '../../slices/tweet/tweetSlice'
import { getBookmarks } from '../../api/api'

import TweetCard from '../cards/tweetCard'

const BookmarkPage = ({ user }) => {
	const dispatch = useDispatch()
	const bookmarks = useSelector(state => state.tweet.bookmarks)

	useEffect(() => {
		const userBookmarks = async () => {
			const { data } = await getBookmarks(user._id)
			
			dispatch(setBookmark(data.result.bookmark))
		}

		userBookmarks()
	}, [user?._id, dispatch])
	
	const Header = () => (
		<div className="w-full p-3 border-b border-color">
			<p className="font-bold text-xl">Bookmarks</p>
			<p className="text-gray-500 text-sm">@{user.username}</p>
		</div>
	)
	
	return (
		<div className="h-full feed-scroll w-[600px] border border-y-0 border-color relative">
			<Header />
			{!bookmarks || bookmarks.length < 1 ? <p className="m-2 homepage-text-color">No bookmarks</p> : !bookmarks ? <div className="mt-[60%] w-full flex items-center justify-center">
				<PulseLoader color="#0EA5E9" />
			</div> : (
				<>
					{bookmarks.map(bookmark => <TweetCard key={bookmark._id} tweet={bookmark} user={user} />)}
				</>
			)}
		</div>
	)
}

export default BookmarkPage