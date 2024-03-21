import React, { useEffect, useState } from 'react'
import Avatar from '../assets/coffee-3.jpg'
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import CommentCard from './CommentCard';
import { FaBookmark } from "react-icons/fa";



function SinglePost({item}) {


  const {currentuser} = useSelector((state) => state.user)
  const [AuthUser , setAuthUser] = useState({})

  // console.log(currentuser)

  // console.log(item)
  const [tweetOwner , setTweetOwner] = useState({})
  const [comment , setComment] = useState(false)
  const [allComments , setAllComments] = useState([])
  const [commentText , setCommentText] = useState("")
  const [like , setLike] = useState(false)
  const [bookmark , setBookmark] = useState(false)
  const GetTweetOwner = async () =>{
    
     const res =  await axios.get(`http://localhost:8080/user/getsingleuser/${item.userId}` , {withCredentials : true})
     .then((value) =>{
      //  console.log(value.data)
       setTweetOwner(value.data.singleUser)
     })
     .catch((error) =>{
       console.log(error)
     })

  }

  useEffect(() =>{
     GetTweetOwner()
  } , [])

   const handleLikeOrDislike = async (TweetId) =>{
    
     console.log(TweetId)

     const res = await axios.post(`http://localhost:8080/tweet/liketweet/${TweetId}` , {authUserId : AuthUser._id } , {withCredentials : true})
     .then((value) =>{
        //  console.log(value.data)
         setLike(!like)
        window.location.reload()
      
         
      

     })
     .catch((error) =>{
       console.log(error)
     })
     
     

   }

  const getAuthUser = async () =>{
    
     const res = await axios.get("http://localhost:8080/user/myprofile" , {withCredentials : true})
     .then((value) =>{
      //  console.log(value.data)
       setAuthUser(value.data.authUser)
     })
     .catch((error) =>{
       console.log(error.response)
     })

  }
   useEffect(() =>{
       getAuthUser ();
   } , []) 

   useEffect(() =>{
      if (typeof(Storage) !== "undefined") {
         // Check if scroll position is stored in sessionStorage
         if (sessionStorage.scrollPosition) {
             // Restore the scroll position
             window.scrollTo(0, sessionStorage.scrollPosition);
             // Clear the stored scroll position
             sessionStorage.removeItem('scrollPosition');
         }
     
         // Add event listener for beforeunload event (before the page is reloaded)
         window.addEventListener('beforeunload', function() {
             // Store the current scroll position in sessionStorage
             sessionStorage.scrollPosition = window.scrollY;
         });
     }
   } , [like , comment , allComments])
  
  //  console.log(item.tweetImage)

  //  Handling adding comment functionality :-
  const handleComment = (e) =>{
     setCommentText(e.target.value)
    
  }

  const addComment = async () =>{
    
      const res = await axios.post(`http://localhost:8080/tweet/addcomment/${item._id}` , {AuthUserId : AuthUser._id , commentText},{withCredentials : true})
      .then((value) =>{
         console.log(value.data)
         toast(value.data.message)
         setCommentText("")
         setComment(false)
         window.location.reload()
      })
      .catch((error) =>{
         console.log(error)
      })

  }

  const ShowAllComments = async () =>{
        const res = await axios.get(`http://localhost:8080/tweet/getallcomments/${item._id}` , {withCredentials : true})
        .then((value) =>{
           console.log(value.data)
           setAllComments(value.data.AllComments)
        })
        .catch((error) =>{
           console.log(error.response.data.message)
        })
  }

  useEffect (() =>{
     if (comment){
       ShowAllComments()
     }
  } , [comment])


  const handleBookMark = async () =>{
   
       const res = await axios.post(`http://localhost:8080/tweet/bookmark/${item._id}` , {AuthUserId : AuthUser._id} ,{withCredentials : true})
       .then((value) =>{
            console.log(value.data)
            toast(value.data.message)
            window.location.reload()
       })
       .catch((error) =>{
          console.log(error.response.data.message)
       })
      
       setBookmark(!bookmark)



  }

  return (
    <div className='mb-4'>
       <div className='flex items-center justify-start gap-2'>
        <img src={item.tweetImage ? item.tweetImage : Avatar} alt="" className='w-8 rounded-full object-cover '/>
       <p>{tweetOwner.name}</p>
       <span className='text-gray-700' >{tweetOwner.username}</span>
       <span className='text-gray-700'>{item.createAt}</span>
        </div>
        <div className='flex flex-col gap-3'>
            <p>{item.description}</p>
            <img src={item.tweetImage ? item.tweetImage : Avatar}  alt="" />
        </div>
        <div className='flex items-center justify-center gap-16 mt-3'>
            <div className='flex items-center justify-start gap-1'>
              <FaRegComment onClick={() => setComment(!comment)}/>
              <span>{item.comments?.length > 0 ? item.comments.length : null}</span>
            </div>
            <div className='flex items-center justify-start gap-1'>
              {
                 item.likes.includes(AuthUser._id) ? <FaHeart onClick={() => handleLikeOrDislike(item._id) }/> :   <FaRegHeart onClick={() => handleLikeOrDislike(item._id)}/>
              }
              <span>{item.likes?.length > 0 ? item.likes.length : null}</span>
            </div>
            <div className='flex items-center justify-start gap-1'>
             {
               AuthUser?.bookMarks?.includes(item._id) ? <FaBookmark onClick={handleBookMark}/>
                : <FaRegBookmark onClick={handleBookMark}/>
             }
              
            </div>
        </div>

      

     {
         comment ? <div className='mt-4'>
             <div className='my-4'>
                {
                   allComments.map((comment , index) =>{
                      return <CommentCard comment = {comment} />
                   })
                }
             </div>
             <div className='flex items-center justify-start gap-4'>
         <img src={Avatar} alt="" className='w-12 rounded-full object-cover '/>
         <input type="text" onChange={handleComment} className='p-2 rounded-2xl w-[80%] outline-none' placeholder='Write Comment...' />
         <button onClick={addComment} className='rounded-2xl bg-blue-500 py-1 px-8 text-white'>Add</button>
         </div>
         </div> : null
     }

    </div>
  )
}

export default SinglePost
