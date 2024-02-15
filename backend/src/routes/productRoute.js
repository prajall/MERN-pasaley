import express from "express";
import { addProduct } from "../controllers/productController.js";
import { authorisedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-product", authorisedUser, addProduct);

export default router;
