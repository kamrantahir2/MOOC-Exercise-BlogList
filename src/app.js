import express from "express";
const app = express();
import mongoose from "mongoose";
import config from "./utils/config.js";
import cors from "cors";
import middleware from "./utils/middleware.js";
import blogRouter from "./controllers/blogs.js";

mongoose.set("strictQuery", false);

mongoose
  .connect(config.password)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
