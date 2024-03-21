const userModel = require ("../Models/userModel.js")
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req , res) =>{
    
    try {
        
        const {username ,name, password ,email} = req.body
        
        if (!username || !name || !password || !email) {
            return res.status(400).json({
                 success : false,
                 message : "Please fill all the fields"
             })
        }

        // check whether the user already exist or not with username :-
        const usernameExist = await userModel.findOne({
             username : username
        })

        if (usernameExist){
           return res.status(400).json({
                success : false,
                message : "Username already taken"
            })
        }

        // check whether the user already exist or not with email :-
        const emailExist = await userModel.findOne({
             email : email
        })


        if (emailExist){
            return res.status(400).json({
                success : false,
                message : "Email already exist"
            })
        }

        //  Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password , salt )

        // Create the user :-
        const registeredUser = await userModel.create({
             username ,
             email,
             password : hashPassword,
             name
        })

        if (!registeredUser){
            return res.status(400).json({
                success : false,
                message : "user can not get registered"
            })
        }

        return res.status(200).json({
            success : true,
            message : "user registered successfully",
            registeredUser
        })

    }
    catch (error) {
         res.status(500).json({
             success : false,
             message : error.message
         }) 
    }

}

const login = async (req , res) =>{
    
   try {
    const {email , password} = req.body

    if (!email || !password) {
       return res.status(400).json({
            success : false,
            message : "Please fill all the fields"
        }) 
    }

    const userExist = await userModel.findOne({
         email : email
    })

    if (!userExist){
        return res.status(400).json({
            success : false,
            message : "Please register first"
        }) 
    }


    //  Compare the password :-
    const isMatch = await bcrypt.compare(password , userExist.password)

    if (!isMatch){
         return res.status(402).json({
            success : false,
            message : "Invalid Credentails "
        }) 
    }

    //  Generate the jwt token

    const token = jwt.sign({userId : userExist._id} , process.env.JWT_SECRET , {expiresIn : "90d"})
    res.cookie ("authToken" , token , {httpOnly : true})

    return res.status(200).json({
        success : true,
        message : "User LoggedIn SuccessFully",
        userExist
    }) 

   }
   catch (error) {
       return    res.status(500).json({
        success : false,
        message : error.message
    }) 
   }


}

const logout = (req , res) =>{
     
   res.cookie ("authToken" , "" );

   return res.status(200).json({
     success : true,
     message : "User Logged Out successfully"
   })
       
    
}


// Get My profile :-
const getMyProfile = async (req , res) =>{
    
    try {
     
        const authUser = await userModel.findById(req.user._id).select("-password");

        if (!authUser){
            return    res.status(400).json({
                success : false,
                message : "Profile can not get"
            }) 
        }

        return res.status(200).json({
            success : true,
            message : "Profile got",
            authUser
        }) 
    }
    catch (error) {
        return    res.status(500).json({
            success : false,
            message : error.message
        }) 
         
    }

}

//  Get All Users :-
const getOtherUsers = async (req , res) =>{
    
    try {
        
        let OtherUsers = await userModel.find().select("-password")

        OtherUsers =  OtherUsers.filter ((item , index) =>{
             return item._id.toString() !== req.user._id.toString()
         })

        if (!OtherUsers){
             return res.status(400).json({
                 success : false,
                 message : "Can not get Other Users"
             })
        }

        return res.status(200).json({
             success : true,
             message : "Getting Other  users",
             OtherUsers

        })

    }
    catch (error) {
         return res.status(500).json({
             success : false,
             message : error.message
         })
    }

}

const ToFollowUser = async (req , res) =>{
     
    try {
         const {userId} = req.params
         const loggedInUser = req.user
         
         const AuthUser = await userModel.findById(loggedInUser._id)
         const userToFollow = await userModel.findById(userId)

        //   Add the loggedInUser id to the followers list of userToFollow :-

         
        if (!userToFollow.followers.includes(AuthUser._id)){
             
        
     
            userToFollow.followers.push(AuthUser._id)
            await userToFollow.save()


            AuthUser.following.push(userToFollow._id)
            await AuthUser.save()

            return res.status(200).json({
                success : true,
                message : `Following ${userToFollow.name} successfully `
            })
        }
        else {
             
            return res.status(200).json({
                success : true,
                message : `Already follow ${userToFollow.name} `
            })
        }



    }
    catch (error){
         return res.status(500).json({
             success : false,
             message : error.message
         })
    }

}


const ToUnfollowUser = async (req , res) =>{
     try {
   
        const {userId} = req.params
        const {myProfile} = req.body
        console.log(userId)
        
        const AuthUser = await userModel.findById(myProfile)
        console.log(myProfile)
        const userToUnfollow = await userModel.findById(userId)
        
        if (userToUnfollow.followers.includes(AuthUser._id)){
             
            userToUnfollow.followers =  userToUnfollow.followers.filter((item , index) =>{
                return item.toString() !== AuthUser._id.toString()
           })

           await userToUnfollow.save()

          

           AuthUser.following =  AuthUser.following.filter((item2 , index2) =>{
                return item2.toString() !== userToUnfollow._id.toString()
           })

           await AuthUser.save()

           return res.status(200).json({
              success : true,
              message : `Unfollowed ${userToUnfollow.name} successfully `
          })
        }
        else {
            return res.status(200).json({
                success : true,
                message : `You need to follow first for unfollowing ${userToUnfollow.name} `
            })
        }
      
     }
     catch (error) {
         res.status(500).json({
             success : error,
             message : error.message
         })
     }
} 



const getSingleUser = async (req , res) =>{
    
     try {
         const {userId} = req.params

         const singleUser = await userModel.findById(userId)

         if (!singleUser){
            return res.status(400).json({
                success : false,
                message : "Single user is not available"
            })
         }

         return res.status(200).json({
             success : true,
             message : "Got SingleUser",
             singleUser

         })
     }
     catch (error) {
         return res.status(500).json({
             success : false,
             message : error.message
         })
     }

}



module.exports = {register , login , logout , getMyProfile , getOtherUsers , ToFollowUser , ToUnfollowUser , getSingleUser}