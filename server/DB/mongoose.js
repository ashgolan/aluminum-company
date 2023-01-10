import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.0usy136.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(URL)
  .then(() => console.log("connected to mongoo"))
  .catch((e) => {
    console.log("mongo connection error", e.message);
  });
