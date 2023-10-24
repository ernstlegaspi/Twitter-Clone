import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PulseLoader } from 'react-spinners'
import { followUser, unfollowUser } from '../../api/api'

const FollowCard = ({ currentUser, user }) => {
	const [hasFollowed, setHasFollowed] = useState(false)
	const [isFollowing, setIsFollowing] = useState(false)
	const [isButtonHovered, setIsButtonHovered] = useState(false)
	const navigate = useNavigate()
	
	useEffect(() => {
		const followingUser = currentUser?.following.filter(following => following === user._id)

		if(followingUser[0]) setHasFollowed(true)
	}, [currentUser?.following, user?._id])

	const handleClick = async () => {
		if(!isFollowing && !hasFollowed) {
			try {
				await followUser({ userId: currentUser?._id, otherUserId: user?._id})
				alert(1)
			}
			catch(error) {
				setIsFollowing(false)
			}

			return
		}

		await unfollowUser({ userId: currentUser?._id, otherUserId: user?._id})
	}
	
	return (
		<div className="w-full">
			{!user || !currentUser ? <div className="w-full pt-10 flex items-center justify-center"><PulseLoader size={10} color="#0EA5E9" /></div> : (
				<div onClick={() => isButtonHovered ? null : navigate(`/${user?.username}/`)} className="flex p-3 cursor-pointer hover:bg-gray-100/50 transition-all">
					<p className="bg-indigo-600 rounded-full text-white py-[6px] px-[15px] w-max h-max text-xl mr-3">{user.name.charAt(0)}</p>
					<div className="flex items-center justify-between w-full">
						<div>
							<p className="font-semibold text-lg">{user.name}</p>
							<p className="mt-[-5px] ml-[-1px] text-gray-500 text-sm font-semibold">@{user.username}</p>
						</div>
						{currentUser._id === user._id ? null : (
							<div onClick={() => {
								setIsFollowing(prev => !prev)
	
								if(!isFollowing && hasFollowed) {
									setHasFollowed(false)
									setIsFollowing(false)
								}
	
								handleClick()
							}} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)} className={`${(hasFollowed && isButtonHovered) || (isFollowing && isButtonHovered) ? 'text-red-500 border border-red-200 hover:bg-red-200/50' : hasFollowed || isFollowing ? 'border border-color' : 'hover:bg-black/75 bg-black text-white'} font-semibold rounded-full py-[5px] px-4 cursor-pointer transition-all`}>
								{(hasFollowed && isButtonHovered) || (isFollowing && isButtonHovered) ? 'Unfollow' : hasFollowed || isFollowing ? 'Following' : 'Follow'}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default FollowCard
