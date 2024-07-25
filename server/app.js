import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({limit:"15kb", extended: true}));
app.use(cookieParser());

//import routes
import userRoutes from "./routes/user.route.js"

//route
app.use("/api/user", userRoutes);

export {app};