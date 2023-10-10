import React from 'react'

const HomeContent = () => {
	return (
		<div className="h-full w-[600px] border border-y-0 border-color">
			<div className="w-full flex">
				<div className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center">
					<p className="py-3 w-max font-bold border-b-[3px] purple-border m-auto">For you</p>
				</div>
				<div className="w-[50%] transition-all hover:bg-gray-200 cursor-pointer flex items-center justify-center homepage-text-color">
					<p>Following</p>
				</div>
			</div>
		</div>
	)
}

export default HomeContent