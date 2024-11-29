import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const userSchema = new mongoose.Schema(
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
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    alternateContact: {
      type: String,
      required: [true, " alternate phone number is required"],
    },
  },
  {
    timestamps: true,
  }
)

// functions
// hash function hash password
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

// compare function decrypt password
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password)
}

// JWT token
userSchema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

const userModel = mongoose.model("Users", userSchema)

export default userModel
