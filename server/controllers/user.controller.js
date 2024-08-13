import { User } from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/apiHelpers.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/constants.js";
import {
  generateAccessAndRefreshToken,
  generateAccessToken,
  isValidEmail,
} from "../utils/helperFunctions.js";
import jwt from "jsonwebtoken";

//registerUser
export const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    userRole = "user",
    secret,
    gender,
  } = req.body;

  if (userRole === "admin") {
    if (!secret) {
      return res
        .status(400)
        .json(new ApiError("Admin registration requires a secret key", 400));
    }
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(400).json(new ApiError("Invalid secret key", 400));
    }
  }
  // check all fields there or not
  if (!firstName || !email || !password || !gender) {
    return res
      .status(400)
      .json(new ApiError("Please fill all the fields", 400));
  }

  // check if email is valid or not
  if (!isValidEmail(email)) {
    res.status(400).json(new ApiError("Invalid email address", 400));
  }

  // if user already exists
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res.status(409).json(new ApiError("User already exists", 409));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    userRole,
    gender,
  });

  if (!user._id) {
    return res
      .status(500)
      .json(new ApiError("Something went wrong while creating user", 500));
  }

  const { accessToken, refreshToken, message } =
    await generateAccessAndRefreshToken(user._id);

  if (!accessToken || !refreshToken) {
    return res.status(500).json(new ApiError(message, 500));
  }

  return res
    .status(201)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(
        {
          firstName,
          lastName,
          email,
          userRole,
          gender,
          accessToken,
          // refreshToken,
        },
        "User created successfully",
        200
      )
    );
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("-refreshToken");

  if (!user) {
    return res.status(400).json(new ApiError("Invalid email", 400));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw res.status(400).json(new ApiError("Invalid password", 400));
  }

  const { accessToken, refreshToken, message } =
    await generateAccessAndRefreshToken(user._id);

  if (!accessToken || !refreshToken) {
    return res.status(500).json(new ApiError(message, 500));
  }

  user.password = null;

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(
        { user, accessToken, refreshToken },
        "User logged in successfully",
        200
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
  res
    .status(200)
    .clearCookie("accessToken", accessCookieOptions)
    .clearCookie("refreshToken", refreshCookieOptions)
    .json(new ApiResponse(null, "User logged out successfully", 200));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    return res.status(401).json(new ApiError("Unauthorize request", 401));
  }
  const decoded = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decoded._id) {
    return res.status(400).json(new ApiError("Invalid refresh token", 400));
  }
  try {
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(400).json(new ApiError("Invalid refresh token", 400));
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return res
        .status(400)
        .json(new ApiError("Refresh token is expired or used", 400));
    }
    const { accessToken, message } =
      await generateAccessToken(user._id);
    user.refreshToken = null;
    return res
      .status(200)
      .cookie("accessToken", accessToken, accessCookieOptions)
      // .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json(new ApiResponse({ accessToken, user }, message, 200));
  } catch (error) {
    return res.status(401).json(new ApiError("Invalid refresh token", 401));
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.status(400).json(new ApiError("Passwords do not match", 400));
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json(new ApiError("User not found", 400));
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(new ApiError("Old password is incorrect", 400));
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(null, "Password changed successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    return res.status(401).json(new ApiError("Unauthorized", 401));
  }
  return res.status(200).json(new ApiResponse(req.user, "User found", 200));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, isAvailable, bio, hobbies } = req.body;

  if (!(firstName && email)) {
    return res
      .status(400)
      .json(new ApiError("First name and email are required.", 400));
  }

  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json(new ApiError("User not found", 400));
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName,
          lastName,
          email,
          isAvailable,
          bio,
          hobbies,
        },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(updatedUser, "User profile updated successfully"));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const uploadOrUpdateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req?.file?.path;

  if (!avatarLocalPath) {
    return res.status(400).json(new ApiError("Image uploading failed", 400));
  }
  const user = req.user;
  if (!user._id) {
    return res.status(400).json(new ApiError("User not found", 400));
  }

  try {
    if (!!user?.avatar?.public_id) {
      const result = await deleteFromCloudinary({
        public_id: user?.avatar?.public_id,
        resource_type: user?.avatar?.resource_type,
      });
      if (result?.status !== 200) {
        return res
          .status(400)
          .json(new ApiError("Failed to delete image from cloudinary", 400));
      }
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      return res.status(400).json(new ApiError("Image uploading failed", 400));
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { avatar } },
      { new: true }
    ).select("-password -refreshToken");
    return res
      .status(200)
      .json(new ApiResponse(updatedUser, "User profile updated successfully"));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});
