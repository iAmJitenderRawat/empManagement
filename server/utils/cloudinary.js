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

  if (!localFilePath) return null;
  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "image",
        folder: "employeeProfilePic",
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>fs.unlink(localFilePath));
  
    const { public_id, secure_url, resource_type } = uploadResult ?? {};
  
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimize_url = await cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });
  
    return { public_id, secure_url, resource_type, optimize_url };
  } catch (error) {
    console.log(error);

  }
};

//deleteFromCloudinary

export const deleteFromCloudinary = async (req, res) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const { public_id, resource_type } = req.body;
    const destroyOptions = { resource_type }; // Pass resource_type as an option
    const { result } = await cloudinary.uploader.destroy(
      public_id,
      destroyOptions
    );
    if (result === "ok") {
      return res
        .status(200)
        .json(new ApiResponse(result, "File deleted successfully", 200));
    } else {
      return res
        .status(400)
        .json(
          new ApiError(`Failed to delete file with public_id ${public_id}`, 400)
        );
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(new ApiError(error.message || "Internal Server Error", 500));
  }
};
