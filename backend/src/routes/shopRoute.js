import express from "express";
import { loginShop, signupShop } from "../controllers/shopController.js";

const router = express.Router();

router.post("/login", loginShop);
router.post("/signup", signupShop);

export default router;
