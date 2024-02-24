import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import shopRoute from "./routes/shopRoute.js";
import productRoute from "./routes/productRoutes.js";

const app = express();

export default app;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("This is homepage");
});
// SETUP ROUTES
app.use("/shop", shopRoute);
app.use("/product", productRoute);
