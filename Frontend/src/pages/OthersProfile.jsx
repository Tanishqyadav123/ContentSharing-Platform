import React, { useEffect, useState } from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import MainProfile from './MainProfile'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function OthersProfile() {

     const {userId} = useParams()

  const navigate = useNavigate()
  const [authUser , setAuthUser] = useState(null)
  const [otherUser , setOtherUser] = useState(null)
  

  const getAuthUser = async () =>{
    const res = await  axios.get("http://localhost:8080/user/myprofile" , {withCredentials : true})
    .then((value) =>{
      
      
        // console.log(value.data.authUser)
        setAuthUser(value.data.authUser)

    })
    .catch((error) =>{
       console.log(error)
       if (!authUser){
        navigate("/login")
       }
    })
}

const getOtherUser = async () =>{
    const res = await  axios.get(`http://localhost:8080/user/getsingleuser/${userId}` , {withCredentials : true})
    .then((value) =>{
      
      
        // console.log(value.data.singleUser)
        setOtherUser(value.data.singleUser)

    })
    .catch((error) =>{
       console.log(error)
       if (!authUser){
        navigate("/login")
       }
    })
}
  useEffect(() =>{
      getAuthUser()
  } , [])
  useEffect(() =>{
    getOtherUser()
  } , [])
  
  return (
    <div className='flex'>
      <LeftSideBar AuthUser={authUser ? authUser : ""}/>
      <MainProfile AuthUser={otherUser ? otherUser : ""}/>
      <RightSideBar/>

    </div>
  )
}

export default OthersProfile
