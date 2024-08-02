import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({limit:"15kb", extended: true}));
app.use(cookieParser());

//import routes
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js";

//route
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes)

export {app};