import express from "express"
import { addDriverController } from "../controllers/driverController.js"
import {
  authenticateOperator,
  authorizeOperator,
  isAuthOperator,
} from "../middlewares/authMiddleware.js"
const router = express.Router()

// ADD AMBULANCE
router.post(
  "/create-driver",
  isAuthOperator,
  authorizeOperator,
  authenticateOperator,
  addDriverController
)

export default router
