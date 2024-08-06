import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ limit: "15kb", extended: true }));
app.use(cookieParser());

// Create a helper function to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, "./../dist")));

// Handle all routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./../dist", "index.html"));
});

//import routes
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

//route
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

export { app };
