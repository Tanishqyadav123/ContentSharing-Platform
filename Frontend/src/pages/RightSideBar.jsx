import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import ToFollow from '../Components/ToFollow';
import axios from 'axios'
function RightSideBar() {
   
    const [otherUser , setOtherUser] = useState([])
    const [input , setInput] = useState("")
   const getOtherUser = async () =>{
    
       const res = await axios.get("http://localhost:8080/user/otherusers" , {withCredentials : true})
       .then((value) =>{
          // console.log(value.data)
          setOtherUser(value.data.OtherUsers)
       })
       .catch((error)=>{
         console.log(error)
       })

   }

   useEffect(() =>{
     getOtherUser()
   } , [])


  

   useEffect(() =>{
     
   } , [input])

  return (
    <div className='h-screen w-[25%] sticky top-0 left-0 p-10 border-r-8 px-18 ' style={{borderRight : "1px solid gray"}}>
     <div className='flex items-center justify-start flex-col gap-8'>
         <div className='flex justify-center items-center gap-2'>

         <FiSearch/>
         <input type="text" onChange={(e) => setInput(e.target.value)} className='rounded p-1.5 outline-none' placeholder='Search...'  />
         </div>

      
          <h1 className='text-center font-bold'>Who To Follow</h1>

        {
           otherUser.filter((user , index) =>{
            
                return input === '' ? user : user.name.includes(input)

           }).map((item , index) =>{
               return <ToFollow user = {item}/>
           })
        }
         
        
        
     </div>
    </div>
  )
}

export default RightSideBar
