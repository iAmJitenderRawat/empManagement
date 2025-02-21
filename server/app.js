import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ limit: "15kb", extended: true }));
app.use(cookieParser());

//import routes
import userRoutes from "./src/routes/user.route.js";
import adminRoutes from "./src/routes/admin.route.js";

//route
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

export { app };
