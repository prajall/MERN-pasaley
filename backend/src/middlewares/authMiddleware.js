import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken";

export const authorisedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw apiError("401", "Please Login");
  } else {
    const decodedData = jwt.decode(token, process.env.JWT_SECRET);

    res.userData = decodedData;
    console.log("user:" + decodedData);
    next();
  }
});
