import ambulanceModel from "../models/ambulanceModel.js"
import driverModel from "../models/driverModel.js"

// ADD AMBULANCE
export const addAmbulanceController = async (req, res) => {
  try {
    console.log("Request Body:", req.body) // Log request body for debugging

    const operatorId = req.operator._id

    // Check if operatorId exists
    if (!operatorId) {
      return res.status(400).send({
        success: false,
        message: "Operator is not authenticated.",
      })
    }

    // Input validation
    // const { ambulanceNumber, type, location } = req.body
    const { ambulanceNumber, type, location, driverIds } = req.body

    // Ensure all required fields are provided
    if (
      !ambulanceNumber ||
      !type ||
      !location ||
      !driverIds ||
      driverIds.length < 2
    ) {
      return res.status(400).send({
        success: false,
        message:
          "Please Provide All Fields (ambulanceNumber, type, location, and at least 2 drivers",
      })
    }

    // Validate the location object
    if (
      !location ||
      typeof location.latitude === "undefined" ||
      typeof location.longitude === "undefined"
    ) {
      return res.status(400).send({
        success: false,
        message: "Location must include both latitude and longitude.",
      })
    }

    // Check if the ambulance number already exists
    const existingAmbulance = await ambulanceModel.findOne({ ambulanceNumber })
    if (existingAmbulance) {
      return res.status(400).send({
        success: false,
        message: "Ambulance number already exists. Please use a unique number.",
      })
    }

    // Check if all drivers are valid
    const drivers = await driverModel.find({ _id: { $in: driverIds } })
    if (drivers.length !== driverIds.length) {
      return res.status(400).send({
        success: false,
        message: "Some of the drivers are invalid.",
      })
    }

    // Create a new ambulance entry
    const ambulance = new ambulanceModel({
      ambulanceNumber,
      type,
      location,
      role: "operator", // Automatically set the role as operator
      operator: operatorId,
      drivers: driverIds, // Assigning the driver IDs to the ambulance
    })

    // Save the new ambulance
    const savedAmbulance = await ambulance.save()

    // Return success response
    res.status(201).json({
      success: true,
      message: "Ambulance added successfully.",
      data: {
        ambulance: savedAmbulance,
        drivers: drivers,
      },
    })
  } catch (error) {
    console.error("Error In add ambulance API:", error)
    res.status(500).send({
      success: false,
      message: "Error In add ambulance API",
      error: error.message || "Unknown error occurred",
    })
  }
}

//GET AMBULANCE DATA
export const getAmbulanceWithDriverDetails = async (req, res) => {
  try {
    const { id } = req.params // Extract the 'id' parameter from the request

    // Find the ambulance by ID and populate the driver details
    const ambulance = await ambulanceModel.findById(id).populate(
      "drivers", // Field to populate
      "name email phone shift" // Specify fields to include from the Driver schema
    )

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" })
    }

    res.status(200).json({
      success: true,
      message: "Ambulance with driver details fetched successfully",
      data: ambulance,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Error fetching ambulance with driver details",
      error: error.message,
    })
  }
}
