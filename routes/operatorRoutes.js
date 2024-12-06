import express from "express"
import {
  // getoperatorProfileController,
  loginController,
  logoutController,
  // logoutController,
  registerController,
} from "../controllers/operatorController.js"
import { isAuth } from "../middlewares/authMiddleware.js"
// import { isAuth } from "../middlewares/authMiddleware.js"

// router object
const router = express.Router()

// REGISTER
router.post("/register", registerController)

// LOGIN
router.post("/login", loginController)

//PROFILE
// router.get("/profile", isAuth, getoperatorProfileController)

// LOGOUT
router.get("/logout", isAuth, logoutController)

export default router
