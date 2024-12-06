import mongoose from "mongoose"

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
    },
    email: {
      type: String,
      required: [true, "Driver email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    shift: {
      type: String,
      enum: ["8am-4pm", "4pm-12am", "12am-8am"], // Driver shift times
      required: true,
    },
    role: {
      type: String,
      enum: ["operator", "admin"],
      required: [true, "Role is required"],
      default: "operator",
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operator",
    },
    status: {
      type: String,
      enum: ["free", "busy", "on-leave"], // Driver's current status
      default: "free", // Default to free
    },
    // ambulances: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Ambulance", // Referencing the ambulance model
    //   },
    // ],
  },
  {
    timestamps: true,
  }
)

const driverModel = mongoose.model("Driver", driverSchema)

export default driverModel
