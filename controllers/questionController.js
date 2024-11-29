import QuestionModel from "../models/questionModel.js"

//CREATE QUESTIONS
export const createQuestionController = async (req, res) => {
  try {
    const { questions, location } = req.body // Expecting 'questions' as an array

    // Validate input
    if (!Array.isArray(questions)) {
      return res.status(400).json({ message: "Questions should be an array" })
    }
    if (!location || !location.latitude || !location.longitude) {
      return res.status(400).json({ message: "Location is required" })
    }

    // Create the question document
    const newQuestion = new QuestionModel({
      patientId: req.user._id, // Automatically assign the user ID
      questions,
      location,
    })

    // Save to the database
    const savedQuestion = await newQuestion.save()

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: savedQuestion,
    })
  } catch (err) {
    console.error("Error:", err)
    res.status(500).json({ message: "Error creating question", error: err })
  }
}

//GET QUESTION & ANSWER
export const getPatientQuestionsController = async (req, res) => {
  try {
    // Get the logged-in user's ID from the request object
    const userId = req.user._id

    // Find questions for the logged-in patient (patientId matches the userId)
    const questions = await QuestionModel.find({ patientId: userId }).populate(
      "patientId",
      "name email" // Optionally populate patient info
    )

    // If no questions are found, return an error message
    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this patient",
      })
    }

    // Return the questions and answers for the patient
    res.status(200).json({
      success: true,
      message: "Patient Questions Fetched Successfully!",
      questions,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error In Fetching Patient Questions",
      error: error.message,
    })
  }
}
