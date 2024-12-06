import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"
import operatorModel from "../models/operatorModel.js"

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies
  //validatiion ||  Check if token exists
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User!..",
    })
  }
  //Verify token
  const decodeData = JWT.verify(token, process.env.JWT_SECRET)
  // Find user by ID and attach to request object
  req.user = await userModel.findById(decodeData._id)
  next() // Pass control to the next middleware/controller
}

// operator
export const isAuthOperator = async (req, res, next) => {
  const { token } = req.cookies
  //validatiion
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User!..",
    })
  }
  const decodeData = JWT.verify(token, process.env.JWT_SECRET)
  req.user = await operatorModel.findById(decodeData._id)
  next()
}

// Middleware to check if user has the 'Operator' role
export const authorizeOperator = (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({ error: "User not authenticated" })
  }

  if (req.user.role !== "Operator") {
    return res.status(403).json({ error: "Access denied. Operators only." })
  }
  next()
}

// Middleware to authenticate JWT token and extract operator information
export const authenticateOperator = (req, res, next) => {
  const token = req.headers["authorization"]

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided, authorization denied.",
    })
  }

  try {
    // Remove 'Bearer ' from the token string
    const bearerToken = token.split(" ")[1]

    // Decode JWT token to extract operator info
    const decoded = JWT.verify(bearerToken, process.env.JWT_SECRET)

    req.operator = decoded // Attach operator information to the request object

    next() // Continue to the next middleware or controller
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token.",
    })
  }
}

// // Middleware for role-based access
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ error: "User does not have access" })
//     }
//     next()
//   }
// }
