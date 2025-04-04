import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./dbcon.js";
import userRoutes from "./routes/user.route.js";
import captainRoutes from './routes/captain.route.js'
import mapsRoutes from './routes/maps.route.js'
import rideRoutes from './routes/rides.route.js'
import {initializeSocket} from './socket.js'
import http from 'http'

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app)

initializeSocket(server)

app.use(cors());
app.use(cookieParser());
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use('/captains', captainRoutes)
app.use('/maps', mapsRoutes)
app.use('/rides', rideRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
