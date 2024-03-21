import React, { useEffect, useState } from 'react'
import GalleryImg from '../assets/GalleryImg.webp'
import Avatar from '../assets/coffee-3.jpg'
import SinglePost from './SinglePost'
import { useSelector } from 'react-redux'
import axios from 'axios'
function ForYou() {

  const {Alltweets} = useSelector((state) => state.user)
  
  const [formData , setFormData] = useState("")
  const [image , setImage] = useState("")
  
  const handleChange = (e) =>{
        setFormData({...formData , [e.target.name] : e.target.value })
  }
  const handleFileChange = async (e) =>{
    
       setImage(e.target.files[0]);
  }

  const handleClick = async (e) =>{
    
    const newData = new FormData()
   

    newData.append("tweetImage" , image)
 const res = await axios.post("http://localhost:8080/upload" , newData)
 .then((value) =>{
    console.log(value.data.image_url)
     formData.tweetImage = value.data.image_url

    console.log(formData)
 })
 .catch((error) =>{
    console.log(error)
 })

      const res1 = await axios.post("http://localhost:8080/tweet/createtweet" ,formData, {withCredentials : true})
      .then((value) =>{
          console.log(value.data)
          window.location.reload()
      })
      .catch((error) =>{
          console.log(error)
      })
  }

  useEffect(() =>{
     
  } , [formData])

  return (
    <div className='w-full flex flex-col '>
        <div className='flex items-center justify-start gap-4'>
        <img src={Avatar} alt="" className='w-12 rounded-full object-cover '/>
        <input type="text" name='description' className='p-3 rounded-2xl w-[80%] outline-none' onChange={handleChange} placeholder='WHAT IS HAPPENING?!...' />

        </div>
        <div  className='flex items-center justify-center gap-[60%]'>
        <label htmlFor="image">
            <img src={GalleryImg} alt="" className='h-8 mt-4 ml-16' />
            
            <input type="file" onChange={handleFileChange} hidden name="" id="image" />
         </label>
         <button className='rounded-2xl bg-blue-500 py-1 px-8 text-white' onClick={handleClick}>Post</button>  
 
        </div>
        <img src={formData.tweetImage ? formData.tweetImage : ""} alt="" />
      
     <div className='flex flex-col items-center justify-start h-[100vh] '>
     {
         Alltweets?.length > 0 ? Alltweets.map((item , index) =>{
           return <SinglePost item = {item}/>
         }): <h1 className='text-center font-bold text-2xl mt-28'>You need to follow others fill your feed page</h1>
      }
     </div>
         

    </div>
  )
}

export default ForYou
