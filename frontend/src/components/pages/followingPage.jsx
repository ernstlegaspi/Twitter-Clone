import React, { useEffect } from 'react'

import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'

import FollowCard from '../cards/FollowCard'
import { getFollowing, getUserByUsername } from '../../api/api'
import { setFollowing, setSearchedUser } from '../../slices/user/userSlice'

const FollowingPage = ({ user }) => {
	const dispatch = useDispatch()
	const following = useSelector(state => state.user.following)
	const searchedUser = useSelector(state => state.user.searchedUser)
	const navigate = useNavigate()
	const params = useParams()

	const menu = (text, width, isActive) => <div onClick={() => {
		if(text === 'Followers') navigate(`/${searchedUser?.username}/followers`)
	}} className="px-5 flex-grow relative h-[57px] cursor-pointer hover:bg-gray-200 transition all flex flex-col items-center justify-end">
		<div className={`flex items-center justify-center h-full ${isActive ? 'text-black' : 'text-gray-500'} font-semibold`}>{text}</div>
		{isActive ? <div className={`absolute mt-[-5px] bg-indigo-500 rounded-full h-[5px] ${width}`}></div> : null}
	</div>

	useEffect(() => {
		const userByUsername = async () => {
			const { data } = await getUserByUsername(params?.username)

			dispatch(setSearchedUser(data.result))
		}

		userByUsername()

		const getAllFollowingUsers = async () => {
			const { data } = await getFollowing(searchedUser?._id)

			dispatch(setFollowing(data.result.following))
			console.log(data.result.following)
		}

		getAllFollowingUsers()
	}, [dispatch, params?.username, searchedUser?._id])

	return (
		<div className="h-full feed-scroll w-[600px] border border-y-0 border-color">
			<div className="p-3 flex">
				<div onClick={() => navigate(`/${searchedUser?.username}`)} className="cursor-pointer transition-all hover:bg-gray-200 rounded-full w-max h-max p-2 mr-3">
					<FiArrowLeft size={20} />
				</div>
				<div>
					<p className="font-bold text-xl">{searchedUser?.name}</p>
					<p className="text-gray-500 text-sm">@{searchedUser?.username}</p>
				</div>
			</div>
			<div className="w-full flex border-b border-color">
				{menu('Followers', 'w-[95px]', false)}
				{menu('Following', 'w-[100px]', true)}
			</div>
			{!following || following.length < 1 ? <div className="w-full pt-10 flex items-center justify-center"><PulseLoader size={10} color="#0EA5E9" /></div> : (
				<>
					{following.map(follower => <FollowCard key={follower._id} currentUser={user} user={follower} />)}
				</>
			)}
		</div>
	)
}

export default FollowingPage
