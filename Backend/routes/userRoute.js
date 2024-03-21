const express = require ("express")
const { register, login, logout, getMyProfile, getAllUsers, getOtherUsers, ToFollowUser, ToUnfollowUser, getSingleUser } = require("../Controllers/userController")
const Authentication = require("../Controllers/AuthController")

const router = express.Router()

router.post("/register" , register)
router.post("/login" , login)
router.get("/logout" , Authentication ,logout)
router.get("/myprofile" , Authentication ,getMyProfile)
router.get("/otherusers" , Authentication ,getOtherUsers)
router.post("/followuser/:userId" , Authentication ,ToFollowUser)
router.post("/unfollowuser/:userId" , Authentication ,ToUnfollowUser)
router.get("/getsingleuser/:userId" , Authentication ,getSingleUser)

module.exports = router