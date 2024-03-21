import React, { useState } from 'react'
import ForYou from '../Components/ForYou'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Following from '../Components/Following'
function Feed() {
  
const [param , setParam] =  useState(window.location.pathname.split("/")[[window.location.pathname.split("/").length - 1]])

  return (
    <div className='h-max w-[50%] p-10 border-r-8 px-12 ' style={{borderRight : "1px solid gray"}}>
       <div className='flex  items-start justify-evenly ' >
        <ForYou/>
      </div>
    </div>
  )
}

export default Feed
