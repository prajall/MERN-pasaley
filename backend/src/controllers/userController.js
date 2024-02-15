import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// generate jwt token
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

//signup new user

const signupUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw apiError("404", "Username and Password are required");
  }

  const userExist = await User.findOne({ username });
  if (userExist) {
    throw apiError("400", "username already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    username,
    password: hashedPassword,
  });

  return res.send(
    apiResponse("200", "User Created Successfully", {
      user: { _id: createdUser._id, username: createdUser.username },
    })
  );
});

//login

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (req.cookies.token) {
    res.send(apiResponse(200, "user already loggedIn"));
  }

  if (!username || !password) {
    throw apiError("404", "Username and Password are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.send(apiError("404", "User not found"));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).send(apiError("400", "Incorrect Password"));
  }

  const loggedInUser = await User.findOne({ username }).select("-password");

  const token = generateToken(user._id);

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 2592000000),
    })
    .send(apiResponse("200", "User logged In Successfully", loggedInUser));
});

export { signupUser, loginUser };
