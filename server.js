import express from "express"
// import dotenv, { config } from "dotenv";
import dotenv from "dotenv"
import colors from "colors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import { mongoDBConnected } from "./config/db.js"

// dotenv config
dotenv.config()

//mongodb/database Connection.......
mongoDBConnected()

// rest object
const app = express()

// MIDDLEWARE.....................
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// ROUTES.........................
//user Routes
import userRoutes from "./routes/userRoutes.js"
app.use("/api/v1/user", userRoutes)
//question Routes
import questionRoutes from "./routes/questionRoutes.js"
app.use("/api/v1/user", questionRoutes)
//operator Routes
import operatorRoutes from "./routes/operatorRoutes.js"
app.use("/api/v1/operator", operatorRoutes)
//ambulance Routes
import ambulanceRoutes from "./routes/ambulanceRoutes.js"
app.use("/api/v1/ambulance", ambulanceRoutes)
//driver Routes
import driverRoutes from "./routes/driverRoutes.js"
app.use("/api/v1/driver", driverRoutes)
//sample Routes
app.get("/", async (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome Developer's! , Server is running..</h1>")
})

// PORT............................
const PORT = process.env.PORT || 8081
// LISTEN..........................
// app.listen(PORT, () => {
//   console.log(
//     `Server is running port number ${PORT} on ${process.env.NODE_ENV} mode`
//       .bgWhite.black
//   )
// })

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server is running port number - http://0.0.0.0:${PORT} on ${process.env.NODE_ENV} mode`
      .bgWhite.black
  )
})
