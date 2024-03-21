const mongoose = require ("mongoose")

const connectDB = async () =>{

    try {
        
        await mongoose.connect("mongodb://127.0.0.1:27017/Twitter")
        .then((value)=>{
          console.log(`Database connected successfully ${mongoose.connection.host}`)
            
        })

    }
    catch (error) {
         res.status(500).json({
             success : true,
             message : error.message
         })
    }
     
}

module.exports = connectDB