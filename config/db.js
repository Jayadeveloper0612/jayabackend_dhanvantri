import mongoose, { mongo } from "mongoose"
import colors from "colors"

export const mongoDBConnected = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `Mongodb Connected Successfully!... ${mongoose.connection.host}`.bgGreen
        .black
    )
  } catch (error) {
    console.log(`Mongodb Error ${error}`.bgRed.white)
  }
}
