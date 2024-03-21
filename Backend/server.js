const express = require ("express")
require("dotenv").config()
const app = express ()
const userRouter = require ("./routes/userRoute.js")
const tweetRouter = require ("./routes/tweetRoute.js")
const connectDB = require ("./Configuration/ConnectDatabase.js")
const cookieParser = require(("cookie-parser"))
const cors = require ("cors")
const multer = require("multer")
const port = process.env.PORT  || 8000
const path = require ("path")


// Connecting the database :-
connectDB()


// MiddleWares :-
app.use(cookieParser())
app.use(cors(
     {
          origin : "http://localhost:5173",
          credentials : true,
          optionsSuccessStatus : 200
     }
))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/user' , userRouter)
app.use('/tweet' , tweetRouter)

// File uploadation using multer :-

const storage = multer.diskStorage({
     destination : './uploads/images',
     filename : (req , file, cb) =>{
           return cb (null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
     }
})

const upload = multer({storage : storage})

app.use('/images' , express.static("uploads/images"))


app.post("/upload" , upload.single("tweetImage") , function (req , res) {
      console.log(req.file)
    res.status(200).json({
      success : true,
      message : "Tweet Image uploaded successfully",
      image_url : `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })

})




app.listen(port , () =>{
     console.log(`Server is running on the port : ${port}`)
})