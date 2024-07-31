import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiHelpers.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  console.log('req.cookies', req.cookies.accessToken)
  const token =
    req.cookies?.accessToken ||
    req.headers["Authorization"]?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json(new ApiError("Not authorized", 401));
  }
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode._id) {
      return res.status(401).json(new ApiError("Invalid token", 401));
    }
    const user = await User.findById(decode._id).select(
      "-password -refreshToken"
    );

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(new ApiError(error.message || "Invalid token", 401));
  }
});
