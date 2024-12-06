import express from "express"
import {
  authenticateOperator,
  authorizeOperator,
  isAuthOperator,
} from "../middlewares/authMiddleware.js"
import {
  addAmbulanceController,
  getAmbulanceWithDriverDetails,
} from "../controllers/ambulanceController.js"
const router = express.Router()

// ADD AMBULANCE
router.post(
  "/create",
  isAuthOperator,
  authorizeOperator,
  authenticateOperator,
  addAmbulanceController
)
//GET
router.get("/:id", getAmbulanceWithDriverDetails)

export default router
