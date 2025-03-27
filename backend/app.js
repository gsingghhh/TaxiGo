import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./dbcon.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
