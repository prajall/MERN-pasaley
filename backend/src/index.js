import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbName } from "./constants.js";
import app from "./app.js";

dotenv.config();

app.listen(process.env.PORT, async () => {
  console.log("Server is running in port", process.env.PORT);
  await mongoose
    .connect(`${process.env.MONGODbURI}/${dbName}`)
    .then((res) => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.log("Database Connection Error: ", error);
    });
});
