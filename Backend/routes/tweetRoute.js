const express = require ("express")
const Authentication = require("../Controllers/AuthController")
const { createTweet, deleteTweet, likeTweet, AddToBookMark, getAllTweets, addComment, showAllComments } = require("../Controllers/tweetController")

const router = express.Router()

router.post("/createtweet" , Authentication , createTweet)
router.delete("/deletetweet/:tweetId" , Authentication , deleteTweet)
router.post("/liketweet/:tweetId" , Authentication  , likeTweet)
router.post("/bookmark/:tweetId" , Authentication , AddToBookMark)
router.get("/getalltweets" , Authentication , getAllTweets)
router.post("/addcomment/:tweetId" , Authentication , addComment)
router.get("/getallcomments/:tweetId" , Authentication , showAllComments)

module.exports = router