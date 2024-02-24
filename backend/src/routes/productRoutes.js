import express from "express";
import {
  addProduct,
  deleteProduct,
  viewProduct,
  searchProducts,
  searchSuggestions,
} from "../controllers/productController.js";
import { authorisedShop } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-product", authorisedShop, addProduct);
router.delete("/:id", authorisedShop, deleteProduct);

router.get("/:id/search", searchProducts);
router.get("/:id/search/suggestions", searchSuggestions );

export default router;
