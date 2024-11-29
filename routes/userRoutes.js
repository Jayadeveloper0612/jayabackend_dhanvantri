import express from "express"
import {
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/userController.js"
import { isAuth } from "../middlewares/authMiddleware.js"

// router object
const router = express.Router()

// REGISTER
router.post("/register", registerController)

// LOGIN
router.post("/login", loginController)

//PROFILE
router.get("/profile", isAuth, getUserProfileController)

// LOGOUT
router.get("/logout", isAuth, logoutController)

export default router
