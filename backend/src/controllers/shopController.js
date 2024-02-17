import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Shop } from "../models/shopModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// generate jwt token
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

//signup new shop

const signupShop = asyncHandler(async (req, res) => {
  const { email, password, shopName } = req.body;

  if (!email || !password) {
    throw apiError(404, "Email and Password are required");
  }
  if (!shopName) {
    throw apiError(400, "Please Enter Shop Name");
  }

  const shopExist = await Shop.findOne({ email });
  if (shopExist) {
    throw apiError(400, "email already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdShop = await Shop.create({
    email,
    password: hashedPassword,
    shopName: shopName,
  });

  return res.send(
    apiResponse("200", "Shop Created Successfully", {
      shop: {
        _id: createdShop._id,
        email: createdShop.email,
        shopName: createdShop.shopName,
      },
    })
  );
});

//login

const loginShop = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (req.cookies.token) {
    res.send(apiResponse(200, "shop already loggedIn"));
  }

  if (!email || !password) {
    throw apiError(404, "Email and Password are required");
  }

  const shop = await Shop.findOne({ email });

  if (!shop) {
    return res.send(apiError(404, "Shop not found"));
  }

  const isPasswordMatch = await bcrypt.compare(password, shop.password);

  if (!isPasswordMatch) {
    return res.status(400).send(apiError(400, "Incorrect Password"));
  }

  const loggedInShop = await Shop.findOne({ email }).select("-password");

  const token = generateToken(shop._id);

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 2592000000),
    })
    .send(apiResponse(200, "Shop logged In Successfully", loggedInShop));
});

export { signupShop, loginShop };
