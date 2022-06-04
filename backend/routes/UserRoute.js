const express=require("express")
const {registerUser, allUsers, loginUser}=require("../controller/UserController")
const router=express.Router()

router.route("/").post(registerUser);
router.route("/").get(allUsers);
router.route("/login").post(loginUser);
module.exports = router;