import React from 'react'
import Avatar from '../assets/image1.png'
function CommentCard({comment}) {
  return (
    <div className='flex my-8 flex-col gap-1 items-start justify-start'>
        <div className='flex items-center justify-start gap-2'>
        <img src={Avatar} alt="" className='w-8 rounded-full object-cover '/>
       <p>{comment.name}</p>
       <span className='text-gray-700' >{comment.username}</span>
        </div>
        <div className='flex flex-col gap-3 ml-12'>
            <p>{comment.commentText}</p>
          
        </div>
    </div>
  )
}

export default CommentCard
