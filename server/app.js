import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

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
