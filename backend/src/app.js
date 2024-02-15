import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import { authorisedUser } from "./middlewares/authMiddleware.js";
import productRoute from "./routes/productRoute.js";

const app = express();

export default app;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("This is homepage");
});
// SETUP ROUTES
app.use("/user", userRoute);
app.use("/products", productRoute);
