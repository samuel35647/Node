const express = require("express")
const router 	= express.Router()
const {showWelcome, showRegister, signIn, getDashboard} = require("../controllers/user.controller")



router.get("/welcome", showWelcome)
router.post("/register", showRegister)
router.post("/signin", signIn);
router.get("/dashboard", getDashboard)



module.exports = router