import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/productModel.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const addProduct = asyncHandler(async (req, res) => {
  // const authorisedUser = res.userData;
  const { name, company, rate, dealerInfo } = req.body;
  const newProduct = {
    name: name,
    company: company,
    rate: rate,
    dealerInfo: dealerInfo || "",
    // user: authorisedUser,
  };

  //PRODUCT VALIDATION
  if (!name) {
    throw apiError(400, "Name is required");
  }
  if (!rate[0].price || !rate[0].quantity) {
    throw apiError(400, "Price and Quantity is required");
  }

  const createdProduct = await Product.create(newProduct);
  res.send(apiResponse(200, "Product Added successfully", createdProduct));
});

export { addProduct };
