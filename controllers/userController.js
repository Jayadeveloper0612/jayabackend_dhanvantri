import userModel from "../models/userModel.js"

// REGISTER
export const registerController = async (req, res) => {
  try {
    const { name, email, password, userName, phone, alternateContact } =
      req.body
    //validation
    if (
      !name ||
      !email ||
      !password ||
      !userName ||
      !alternateContact ||
      !phone
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      })
    }
    // check existing user
    const existingUser = await userModel.findOne({ email })
    // validation
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      })
    }
    const user = await userModel.create({
      name,
      email,
      password,
      userName,
      city,
      country,
      phone,
      alternateContact,
    })
    res.status(201).send({
      success: true,
      message: "Registeration Success, Please login",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    })
  }
}

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Add Email or Password",
      })
    }
    // check user
    const user = await userModel.findOne({ email })
    // user validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      })
    }
    //check password decrypted
    const isMatch = await user.comparePassword(password)
    // validation
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credential!..",
      })
    }
    // token
    const token = user.generateToken()
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    })
  }
}

// GET USER PROFILE
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id)
    user.password = undefined
    res.status(200).send({
      success: true,
      message: "User Profile Fetched Successfully!..",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error In Profile API",
      error,
    })
  }
}

// LOGOUT
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout Successfully!...",
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error In Logout API",
      error,
    })
  }
}
