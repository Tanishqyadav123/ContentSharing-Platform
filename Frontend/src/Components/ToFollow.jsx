import React from 'react'
import Avatar from '../assets/coffee-3.jpg'
import { Link } from 'react-router-dom'

function ToFollow({user}) {
  return (
    <div className='flex items-center justify-start gap-8 w-[90%]'>
    <div className='flex items-center justify-start gap-2 w-[100%]'>
    <img src={Avatar} alt="" className='w-12 rounded-full object-cover'/>
      <div>
        <h1 className='font-bold'>{user.name}</h1>
        <span className='text-gray-700 text-sm'>
            {user.username}
        </span>
      </div>
    </div>
     <Link to={`/profile/${user._id}`}> <button className= ' text-sm bg-black text-white px-3 py-2 rounded-2xl' >Profile</button></Link>
    </div>
  )
}

export default ToFollow
