import { Router } from "express"


import { registerUser,loginUser } from "../controllers/user.controllers.js";


const router = Router();

router.route("/signup").post(registerUser)
router.route("/signin").post(loginUser)




export default router