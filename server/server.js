import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import userRoute from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  autoIndex: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
  process.exit(1); 
});


app.use("/api/users", userRoute); 

app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
