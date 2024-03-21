import React, { useEffect, useState } from 'react'
import Logo from '../assets/TwitterLogo.png'
import NavLinks from '../Components/NavLinks'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/image1.png'
import axios from 'axios'
function LeftSideBar({AuthUser}) {

  const navigate = useNavigate()

  const [navData , setNavData] = useState(
    [{
         name : "Home",
         Logo : "IoMDHome"
    },
    {
         name : "Explore",
         Logo : "IoMDHome"
    },
    {
         name : "Notifications",
         Logo : "IoMDHome"
    },
    {
         name : "Messages",
         Logo : "IoMDHome"
    },
    {
         name : "Grok",
         Logo : "IoMDHome"
    },
    {
         name : "Premium",
         Logo : "IoMDHome"
    },
    {
         name : "Profile",
         Logo : "IoMDHome"
    },
    {
         name : "More",
         Logo : "IoMDHome"
    },
    ]
    )
    const [showLogout , setShowLogout] = useState(false)
    useEffect(() =>{
     if (AuthUser == null && AuthUser == undefined){
      // console.log("object")
          navigate("/login")
    }
  
  } , [])

  const handleLogout = async ()=>{
     
      const res = await axios.get("http://localhost:8080/user/logout" , {withCredentials : true})
      .then((value) =>{
           console.log(value.data)
           navigate("/login")
      })
      .catch((error) =>{
           console.log(error)
      })

  }
  

  return (
    <div className='h-screen w-[25%] sticky top-0 left-0 p-10 border-r-8 px-28' style={{borderRight : "1px solid gray"}}>
        <div className='flex flex-col items-start justify-center gap-4 ' >
        <img src={Logo} alt="Logo" className='h-6 my-2' />
       
       {
         navData.map((item) =>{
             return   <NavLinks   name = {item.name} Logo = {item.Logo} />
         })
       }

       <button className='rounded-2xl bg-blue-500 py-1 px-8 text-white'>Post</button>

      {
           showLogout ?  <div>
           <button className='w-50% bg-blue-500 py-1 px-8 text-white rounded-2xl' onClick={handleLogout}>logout</button>
        </div> : null
      }

         <div className='flex items-center justify-start gap-2 mt-4  w-[15vw] hover:bg-gray-300 hover:p-2 ease-in duration-300  hover:rounded-2xl hover:cursor-pointer' onClick={() => setShowLogout(!showLogout)}>
          <img src={avatar} className='w-12' alt="" />
          <div className='flex flex-col items-center justify-center gap-1'>
             <h1 className='font-bold text-sm'>{AuthUser.name}</h1>
             <p className='text-sm'>{AuthUser.username}</p>
          </div>
         </div>

        </div> 

        </div>
   
  )
}

export default LeftSideBar
