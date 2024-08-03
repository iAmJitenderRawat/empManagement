import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { ApiError, ApiResponse } from "./apiHelpers.js";

export const uploadOnCloudinary = async (localFilePath) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!localFilePath) {
    return res
      .status(400)
      .json(new ApiError("Local file path is required", 400));
  }
  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: "employeeProfilePic",
    });
    const { public_id, secure_url, resource_type } = uploadResult ?? {};

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimize_url = await cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    return { public_id, secure_url, resource_type, optimize_url };
  } catch (error) {
    console.log(error);
  } finally{
    // Delete the local file after upload
    await fs.unlink(localFilePath);
  }
};

//deleteFromCloudinary

export const deleteFromCloudinary = async (avatar) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const { public_id, resource_type } = avatar;
    const destroyOptions = { resource_type }; // Pass resource_type as an option
    const { result } = await cloudinary.uploader.destroy(
      public_id,
      destroyOptions
    );

    if (result === "ok") {
      return { status: 200 };
    }
  } catch (error) {
    return { message: error.message, status: error?.status || 500 };
  }
};
