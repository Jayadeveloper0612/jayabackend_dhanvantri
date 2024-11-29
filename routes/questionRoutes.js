import express from "express"
import {
  createQuestionController,
  getPatientQuestionsController,
} from "../controllers/questionController.js"
import { isAuth } from "../middlewares/authMiddleware.js"

// router object
const router = express.Router()

// CREATE QUESTION
router.post("/questions", isAuth, createQuestionController)

// GET QUESTION
router.get("/questions", isAuth, getPatientQuestionsController)

export default router
