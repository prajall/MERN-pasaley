import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/productModel.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Shop } from "../models/shopModel.js";

const addProduct = asyncHandler(async (req, res) => {
  const authorisedShopId = res.shopData;
  const { name, company, rate, dealerInfo } = req.body;
  const newProduct = {
    name: name,
    company: company,
    rate: rate,
    dealerInfo: dealerInfo || "",
    shop: authorisedShopId,
  };
  //find shop
  const shop = await Shop.findById(authorisedShopId).select("-password");
  //PRODUCT VALIDATION
  if (!name) {
    throw apiError(400, "Name is required");
  }
  if (!rate[0].price || !rate[0].quantity) {
    throw apiError(400, "Price and Quantity is required");
  }
  const createdProduct = await Product.create(newProduct);

  // ADD PRODUCT ID TO SHOP'S PRODUCTLIST
  shop.productsList.push(createdProduct._id);
  shop.save();

  res.send(apiResponse(200, "Product Added successfully", createdProduct));
});

// =========== DELETE PRODUCT

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId).catch((err) => {});

  if (!product) {
    throw apiError(404, "Product not Found");
  }
  const deletedProduct = await Product.deleteOne({ _id: productId });

  res.send(apiResponse(200, "Product Deleted Successfully", deletedProduct));
});

// ============= VIEW PRODUCT

const viewProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId).catch((err) => {});

  if (!product) {
    throw apiError(404, "Product not Found");
  } else {
    res.send(apiResponse(200, "Product retrieved Successfully", product));
  }
});

const searchProducts = asyncHandler(async (req, res) => {
  const searchKeyword = req.query.keyword;
  const shopId = req.params.id;

  const shop = await Shop.findById(shopId);

  if (!shop) {
    throw apiError(404, "Shop Not Found");
  }

  // ================= SEARCH PRODUCT

  const partialProductName = new RegExp(searchKeyword, "i"); // Case-insensitive regex

  const searchedProducts = await Product.find({
    _id: { $in: shop.productsList },
    name: { $regex: partialProductName },
  });

  res.send(apiResponse(200, "Search Results retrieved", searchedProducts));
});

const searchSuggestions = asyncHandler(async (req, res) => {
  const shopId = req.params.id;
  const { searchInput } = req.body;

  const shop = await Shop.findById(shopId);

  const suggestions = await Product.find({
    _id: { $in: shop.productsList },
    name: { $regex: `^${searchInput}`, $options: "i" },
  }).limit(10);
  res.send(apiResponse(200, "Suggestions Retrieved successfully", suggestions));
});

const uploadFile = asyncHandler(async(req,res)=>{
  const imageUrl = req.files.image.path
})

export {
  addProduct,
  deleteProduct,
  viewProduct,
  searchProducts,
  searchSuggestions,
};
