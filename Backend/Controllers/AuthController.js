const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")

const Authentication = async (req , res , next) =>{
     
    try {
        console.log(req.cookies)
         const {authToken} = req.cookies
         console.log(authToken)

        if (!authToken){
             return res.status(401).json({
                 success : false,
                 message : "UnAuthorised Access Denied"
             })
        }

         const decoded = jwt.verify(authToken , process.env.JWT_SECRET)
        //  console.log(decoded)

         req.user = await userModel.findById(decoded.userId)
        //  console.log(req.user)

         next()
    }
    catch (error) {
         return res.status(500).json({
             success : false,
             message : error.message
         })
    }

}

module.exports = Authentication