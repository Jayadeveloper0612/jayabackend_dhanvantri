import operatorModel from "../models/operatorModel.js"

// REGISTER
export const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      operatorName,
      operatorRoll,
      phone,
      alternateContact,
    } = req.body
    //validation
    if (
      !name ||
      !email ||
      !password ||
      !operatorName ||
      !operatorRoll ||
      !alternateContact ||
      !phone
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      })
    }
    // check existing operator
    const existingOperator = await operatorModel.findOne({ email })
    // validation
    if (existingOperator) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      })
    }
    const operator = await operatorModel.create({
      name,
      email,
      password,
      operatorName,
      operatorRoll,
      slot: 0, // Automatically add the slot field
      phone,
      alternateContact,
    })
    res.status(201).send({
      success: true,
      message: "Registration Success, Please login",
      operator,
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
    // check operator
    const operator = await operatorModel.findOne({ email })
    // operator validation
    if (!operator) {
      return res.status(404).send({
        success: false,
        message: "operator Not Found!",
      })
    }
    //check password decrypted
    const isMatch = await operator.comparePassword(password)
    // validation
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credential!..",
      })
    }
    // token
    const token = operator.generateToken()
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
        operator,
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

// GET operator PROFILE
export const getoperatorProfileController = async (req, res) => {
  try {
    const operator = await operatorModel.findById(req.operator._id)
    operator.password = undefined
    res.status(200).send({
      success: true,
      message: "operator Profile Fetched Successfully!..",
      operator,
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
