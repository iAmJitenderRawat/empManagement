import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
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

// // Serve static files from the React app's build directory
// app.use(express.static(path.join(__dirname, '../')));

// // Handle all routes and serve index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

//import routes
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

//route
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

export { app };
