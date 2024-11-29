import mongoose from "mongoose"

// Define the schema for Question
const questionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Referencing the User model
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: [true, "Question is required"],
        },
        answer: {
          type: String,
          default: "", // Optional initially, empty by default
        },
      },
    ],
    location: {
      latitude: {
        type: Number,
        required: [true, "Latitude is required"],
      },
      longitude: {
        type: Number,
        required: [true, "Longitude is required"],
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
)

// Model Creation
const QuestionModel = mongoose.model("Question", questionSchema)

export default QuestionModel
