import React, { useEffect, useState } from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import Feed from './Feed'
import axios from 'axios'
import { setAllTweets, setCurrentUser } from '../redux/userSlice'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [authUser , setAuthUser] = useState(null)
  

  //  console.log(currentuser)
  const getAuthUser = async () =>{
    
      const res = await axios.get("http://localhost:8080/user/myprofile" , {withCredentials : true})
      .then((value) =>{
        //  console.log(value.data.authUser)
         setAuthUser(value.data.authUser)
         
        
         
      })
      .catch((error) =>{
         console.log(error.response.data.message)
         if (authUser == null && authUser == undefined){
          console.log(authUser)
              navigate("/login")
        }
      })

    
  }

  useEffect(() =>{
     getAuthUser()
  } , [])

  const getAllTweets = async () =>{
    
      const res = await axios.get("http://localhost:8080/tweet/getalltweets" , {withCredentials : true})
      .then((value) =>{
        //  console.log(value.data)
         dispatch(setAllTweets(value.data.AllTweets))
      })
      .catch((error) =>{
         console.log(error)
      })

  }

console.log(authUser)
  useEffect(() =>{
    
    getAllTweets()
  
  } , [])
  
  return (
    <div className='flex'>
      <LeftSideBar AuthUser = {authUser ? authUser : ""}/>
      <Feed/>
      <RightSideBar/>
    </div>
  )
}

export default Home
