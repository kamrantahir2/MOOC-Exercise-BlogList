import express from "express";
const app = express();
import mongoose from "mongoose";
import config from "./utils/config.js";

mongoose.set("strictQuery", false);

mongoose
  .connect(config.password)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

export default app;
