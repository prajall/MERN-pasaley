import { Shop } from "../models/shopModel.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken";

export const authorisedShop = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw apiError("401", "Please Login");
  } else {
    const decodedData = jwt.decode(token, process.env.JWT_SECRET);

    const shopExist = await Shop.findOne({ _id: decodedData.id });

    if (shopExist) {
      res.shopData = decodedData.id;
      next();
    } else {
      throw apiError(404, "Shop not found");
    }
  }
});
