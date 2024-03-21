import React, { useEffect, useState } from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import MainProfile from './MainProfile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {


  const navigate = useNavigate()
  const [authUser , setAuthUser] = useState(null)

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

  useEffect(() =>{
      getAuthUser()
  } , [])
  
  return (
    <div className='flex'>
      <LeftSideBar AuthUser={authUser ? authUser : ""}/>
      <MainProfile AuthUser={authUser ? authUser : ""}/>
      <RightSideBar/>

    </div>
  )
}

export default Profile
