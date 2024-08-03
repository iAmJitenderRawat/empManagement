import { app } from "./app.js";
import connectDB from "./src/db/db.js";
// import dotenv from "dotenv";
// dotenv.config({path:"./.env"});

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("app server not working", err.message));
