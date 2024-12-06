import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const operatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password length should be greadter then 6 character"],
    },
    operatorName: {
      type: String,
      required: [true, "Operator name is required"],
    },
    operatorRoll: {
      type: String,
      required: [true, "Operator roll is required"],
    },
    slot: {
      type: Number,
      default: 0, // Default value for slot
    },
    assignedUsers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        questions: Array,
        location: Object,
      },
    ],
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    alternateContact: {
      type: String,
      required: [true, " alternate phone number is required"],
    },
    role: {
      type: String,
      enum: ["Operator", "Admin"], // Define valid roles
      default: "Operator", // Default role
    },
  },
  {
    timestamps: true,
  }
)

// functions
// hash function hash password || Encrypt password before saving
operatorSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

// compare function decrypt password || Password comparison method
operatorSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password)
}

// Generate JWT token
operatorSchema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

const operatorModel = mongoose.model("Operator", operatorSchema)

export default operatorModel
