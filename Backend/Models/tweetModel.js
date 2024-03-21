const mongoose = require ("mongoose")

const tweetSchema = new mongoose.Schema({
     description : {
         type : String ,
         required : true,

     },
     userId : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "user"
     },
     likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
     ],
   
     comments : [
        {}
     ],
     tweetImage : {
         type : String
     }
} , {timestamps : true})


module.exports = mongoose.model("tweet" , tweetSchema)