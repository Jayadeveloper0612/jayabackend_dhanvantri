import mongoose from "mongoose"

const ambulanceSchema = new mongoose.Schema(
  {
    ambulanceNumber: {
      type: String,
      required: [true, "Ambulance number is required"],
      unique: true,
    },
    type: {
      type: String,
      required: [true, "Ambulance type is required"],
      enum: ["ICU", "Basic", "Advanced"], // Valid types: ICU, basic, advanced
    },
    status: {
      type: String,
      default: "available", // available, in-use, maintenance
    },
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
    role: {
      type: String,
      required: [true, "Role is required"],
      default: "operator", // Set default role to operator if not specified
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operator", // Assuming you have an "Operator" model for operators
    },
    drivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver", // Referencing the ambulance model
      },
    ],
    // assignedDriver: [
    //   {
    //     driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    //     name: String,
    //     email: String,
    //     phone: String,
    //     shift: String,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
)

const ambulanceModel = mongoose.model("Ambulance", ambulanceSchema)

export default ambulanceModel
