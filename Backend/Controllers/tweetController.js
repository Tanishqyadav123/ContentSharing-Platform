const tweetModel = require ("../Models/tweetModel.js")
const userModel = require("../Models/userModel.js")

const createTweet = async (req , res ) =>{

  try {
    const loggedInUser = req.user
    
    const {description , tweetImage} = req.body

    const newTweet = await tweetModel.create({...req.body , userId : loggedInUser._id}  )

    if (!newTweet){
         return res.status(400).json({
             success : false,
             message : "Tweet can not be created"
         })
    }


    //  Add the newly created TweetId in the tweets array of  loggedInUser 
     const AuthUser = await userModel.findById(loggedInUser._id)
     AuthUser.tweets.push(newTweet._id)
     await AuthUser.save()

     return res.status(200).json({
         success : true,
         message : ` New Tweet created by ${AuthUser.name} ` ,
         newTweet
     })
  }
  catch (error) {
    return res.status(500).json({
        success : false,
        message : error.message
        
    })
  }


}

const deleteTweet = async (req , res) =>{
  
    try {
      
         const loggedInUser = req.user._id
         
        const {tweetId} = req.params;

        const TweetToDelete = await tweetModel.findById(tweetId)

        if (loggedInUser._id.toString() !== TweetToDelete.userId.toString()){
             return res.status(401).json({
               success : false,
               message : "You can only delete your tweets"
             })
        }


        const authUser = await userModel.findById(loggedInUser._id)


        console.log(tweetId)

   authUser.tweets =  authUser.tweets.filter((item , index) =>{
           return item.toString() != tweetId.toString()
       })

       await authUser.save()
    
       
      //   Delete the tweet :-
      const deletedTweet = await tweetModel.findByIdAndDelete(tweetId)

      if (!deletedTweet){
         return res.status(400).json({
           success : false,
           message : "Tweet can not deleted"
         })
      }

      return res.status(200).json({
        success : true,
        message : "Tweet deleted successfully",
        deletedTweet,
        authUser
      })



    

    }
    catch (error) {
       return res.status(500).json({
         success : false,
         message : error.message
       })
    }

}


//  Liking the tweet :-
const likeTweet = async (req , res) =>{
  
    try {
      const {authUserId} = req.body
      const {tweetId} = req.params

      const authUser = await userModel.findById(authUserId)

      const LikedTweet = await tweetModel.findById(tweetId)
      
    
   if (LikedTweet.likes.length !== 0){
        let index = LikedTweet.likes.indexOf(authUserId)
        
        
        if (index != -1){
                LikedTweet.likes = LikedTweet.likes.filter((item , index) =>{
                  return item.toString() !== authUserId.toString()      
              })
              await LikedTweet.save()

          res.status(200).json({
              success : true,
              message : `Tweet DisLiked by ${authUser.name} successfully`,
              LikedTweet
          })
        }
        else {
          LikedTweet.likes.push(authUser._id)
          await LikedTweet.save()
   
         res.status(200).json({
            success : true,
            message : `Tweet Liked ${authUser.name} successfully`,
            LikedTweet
         })
        }
   }
   else {
     
       LikedTweet.likes.push(authUser._id)
       await LikedTweet.save()

      res.status(200).json({
         success : true,
         message :  `Tweet Liked ${authUser.name} successfully`,
         LikedTweet
      })

   }

      


    } 
    catch (error) {
      return res.status(500).json({
        success : false,
        message : error.message
      })
    }

}

const AddToBookMark = async (req , res) =>{
  
  try {
      
    const {AuthUserId} = req.body
    const {tweetId} = req.params

    const authUser = await userModel.findById(AuthUserId)
    console.log(authUser.bookMarks.includes(tweetId))

    if (authUser.bookMarks.includes(tweetId)){
      
       authUser.bookMarks =   authUser.bookMarks.filter((item , index) =>{
                return item.toString() !== tweetId.toString()
         })

         await authUser.save()

         return res.status(200).json({
           success : true,
           message : "Removed From BookMark",
           authUser
         })

    }
    else {
      
        authUser.bookMarks.push(tweetId)

        await authUser.save()

        return res.status(200).json({
          success : true,
          message : "Added to BookMark",
          authUser
        })

    }



    


  } 
  catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }

}


const getAllTweets = async (req , res) =>{
  
  //  Total Tweets = LoggedInUserTweets + LoggedInUserFollowingTweets

     try {
      
         const LoggedInUserId = req.user._id
         const AuthUser = await userModel.findById(LoggedInUserId)

         const AuthUserTweets = await tweetModel.find({userId : AuthUser._id})
         const AuthUserFollowingTweets = await Promise.all( AuthUser.following.map((otheruserId) =>{
             return tweetModel.find({userId : otheruserId})
         }))

         return res.status(200).json({
           success : true,
           message : "All the tweets are here",
           AllTweets : AuthUserTweets.concat(...AuthUserFollowingTweets)
         })

     }
     
     catch (error) {
       return res.status(500).json({
         success : true,
         message : error.message
       })
     }

}

// Adding the comment to the post :-
const addComment = async (req , res) =>{
   
   try {
    const {AuthUserId , commentText} = req.body;
    const {tweetId} = req.params;


    console.log(typeof AuthUserId , typeof commentText)

      const CommentedUser = await userModel.findById(AuthUserId)

    if (!commentText){
       return res.status(400).json({
         success : false,
         message : "Please write something"
       })
    }
   
   //  Find the tweet :-
   const tweet = await tweetModel.findById(tweetId)
 
   tweet.comments.push({
      name : CommentedUser.name,
      username : CommentedUser.username,
      commentText
   })
 
   await tweet.save();

   return res.status (200).json({
        success : true,
        message : "Comment Added SuccessFully",
        tweet
   })

   }
   catch (error) {
     return res.status(500).json({
       success : false,
       message : error.message
     })
   }
 

}

// Showing all comnents :-
const showAllComments = async (req , res) =>{
  
   try {
    
     const {tweetId} = req.params
     
     const tweet = await tweetModel.findById(tweetId)

       return res.status(200).json({
         success : true,
         message : "All comment of this tweet",
         AllComments : tweet.comments
       })

   }
   catch (error) {
     return res.status(400).json({
       success : true,
       message : error.message
     })
   }

} 

module.exports = {createTweet , deleteTweet , likeTweet , AddToBookMark , getAllTweets , addComment , showAllComments}