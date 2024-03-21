import React, { useEffect, useState } from 'react'
import Avatar from '../assets/coffee-3.jpg'
import profileIamge from '../assets/image1.png'
import axios from 'axios'
function MainProfile({AuthUser}) {
   
  console.log(AuthUser)
  const [loggedInUser , setLoggedInUser] = useState({})
  const [MyProfile , setMyprofile] = useState({})

  const getLoggedInUser = async () =>{
    
     const res = await axios.get("http://localhost:8080/user/myprofile" , {withCredentials : true})
     .then((value) =>{
         console.log(value.data)
         setLoggedInUser(value.data.authUser)
     })
     .catch((error) =>{
         console.log(error)
     })

  }

  console.log(AuthUser)

  useEffect(() =>{
    
  } , [AuthUser])

  useEffect(() =>{
     getLoggedInUser()
  } , [])
  console.log(AuthUser.tweets)

  // Calling function for unfollowing the user :-
  const handleUnFollowUser = async (userId) =>{
    
      const res =  await axios.post(`http://localhost:8080/user/unfollowuser/${userId}` , {myProfile : MyProfile._id} ,{withCredentials : true} )
      .then((value) =>{
         // console.log(value.data)
      window.location.reload()

      })
      .catch((error) =>{
         console.log(error)
      })

  }

  const handleFollowUser = async (userId) =>{
     
   const res = await axios.post(`http://localhost:8080/user/followuser/${userId}` , {myProfile : MyProfile._id} , {withCredentials : true} )
   .then((value) =>{
      // console.log(value.data)
      window.location.reload()
   })
   .catch((error) =>{
      console.log(error)
   })

  }

  const getAuthUser = async () =>{
    
   const res = await axios.get("http://localhost:8080/user/myprofile" , {withCredentials : true})
   .then((value) =>{
   //   console.log(value.data)
     setMyprofile(value.data.authUser)
   })
   .catch((error) =>{
     console.log(error.response)
   })

}
 useEffect(() =>{
     getAuthUser ();
 } , []) 


  return (
    <div className='h-[60vh] w-[50%] p-10 border-r-8 px-12 flex flex-col gap-4 ' style={{borderRight : "1px solid gray"}}>
      <div>
     
       <h1 className='font-bold'>{AuthUser.name}</h1>
       <p className='text-gray-600 text-sm'>{AuthUser.tweets == undefined ?  0 : AuthUser.tweets.length} tweets</p>
      </div>
     <div className='h-[70%]' >
     <img style={{position : "relative"}} src={Avatar} className='h-[80%] w-[100%] object-fill' alt="" />
     <img src={profileIamge} className='w-28 rounded-full ' style={{border : "3px solid white" , position : "absolute" , top : "16rem" }} alt="" />
     </div>

     {/*  Full Name and username with edit button  */}
     <div className='flex items-center justify-between'>
     <div className='flex flex-col gap-1'>
     <h1 className="font-bold text-xl">{AuthUser.name}</h1>
      <p className='text-gray-400'>{AuthUser.username}</p>
     </div>
      {
         loggedInUser.username === AuthUser.username ? <button className= ' text-sm bg-black text-white px-3 py-2 rounded-2xl' >Edit</button> : loggedInUser.following?.includes(AuthUser._id) ? <button className= ' text-sm bg-black text-white px-3 py-2 rounded-2xl' onClick={() => handleUnFollowUser (AuthUser._id)} >UnFollow</button> : <button className= ' text-sm bg-black text-white px-3 py-2 rounded-2xl' onClick={() => handleFollowUser (AuthUser._id)} >Follow</button>
      }
     </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolor eius aliquam commodi assumenda eligendi cum laudantium ipsum sequi provident?</p>

      <div className='flex items-center justify-start gap-4'>
       <h1>  <span className='font-bold mr-1'>{AuthUser.followers == undefined ?  0 : AuthUser.followers.length}</span>Followers </h1>
       <h1>  <span className='font-bold mr-1'>{AuthUser.following == undefined ?  0 : AuthUser.following.length}</span>Following </h1>
      </div>
      </div>

  )
}

export default MainProfile
