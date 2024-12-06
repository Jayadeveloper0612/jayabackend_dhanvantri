import driverModel from "../models/driverModel.js"

// //second logic
// // Helper function to check if current time is within a shift
// const isTimeInShift = (shift) => {
//   const now = new Date()
//   const currentTime = now.getHours() * 60 + now.getMinutes() // Convert current time to minutes

//   let shiftStart, shiftEnd

//   switch (shift) {
//     case "8am-4pm":
//       shiftStart = 8 * 60 // 8am in minutes
//       shiftEnd = 16 * 60 // 4pm in minutes
//       break
//     case "4pm-12am":
//       shiftStart = 16 * 60 // 4pm in minutes
//       shiftEnd = 24 * 60 // 12am in minutes (next day)
//       break
//     case "12am-8am":
//       shiftStart = 0 * 60 // 12am in minutes
//       shiftEnd = 8 * 60 // 8am in minutes
//       break
//     default:
//       return false // If no valid shift, return false
//   }

//   // Handle the case where the shift goes past midnight (e.g., 4pm-12am or 12am-8am)
//   if (shiftEnd <= shiftStart) {
//     if (currentTime >= shiftStart || currentTime < shiftEnd) {
//       return true
//     }
//   } else {
//     if (currentTime >= shiftStart && currentTime < shiftEnd) {
//       return true
//     }
//   }

//   return false // Current time is not within the shift
// }

export const addDriverController = async (req, res) => {
  try {
    console.log("Request Body:", req.body)

    // Ensure operator is authenticated
    const operatorId = req.operator._id
    if (!operatorId) {
      return res.status(400).send({
        success: false,
        message: "Operator is not authenticated.",
      })
    }

    // Input validation
    const { name, email, phone, shift } = req.body
    if (!name || !email || !phone || !shift) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      })
    }

    //first logic
    // // Determine status based on shift
    // let status = "free" // Default status is free
    // if (shift === "8am-4pm" || shift === "4pm-12am" || shift === "12am-8am") {
    //   status = "busy" // Set status to busy during working hours
    // }
    // second logic
    // let status = isTimeInShift(shift) ? "busy" : "free"

    // Check for existing driver
    const existingDriver = await driverModel.findOne({ email })
    if (existingDriver) {
      return res.status(400).send({
        success: false,
        message: "Email already taken",
      })
    }

    // Create new driver
    const driver = new driverModel({
      name,
      email,
      phone,
      shift,
      role: "operator",
      operator: operatorId,
      // status,
    })

    // Save the new ambulance
    const savedDriver = await driver.save()

    res.status(201).send({
      success: true,
      message: "Driver added successfully.",
      operator: savedDriver,
    })
  } catch (error) {
    console.error("Error in add driver API:", error)
    res.status(500).send({
      success: false,
      message: "Error in add driver API",
      error: error.message || "Unknown error occurred",
    })
  }
}
