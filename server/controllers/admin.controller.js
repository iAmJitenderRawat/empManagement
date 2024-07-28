import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/apiHelpers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// addProject
export const addProject = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const { projectName, timeline, teamLead, teamMembers } = req.body;
    if (!projectName || !timeline || !teamLead || !teamMembers) {
      return res
        .status(400)
        .json(new ApiError("Please fill in all fields.", 400));
    }
    const project = await Project.create({
      projectName,
      timeline,
      teamLead,
      teamMembers,
    });
    if (!project) {
      return res
        .status(400)
        .json(new ApiError("Failed to create project.", 400));
    }
    return res
      .status(201)
      .json(new ApiResponse(project, "Project added successfully.", 200));
  } catch (error) {}
});

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const users = await User.find().select("-password -refreshToken");
    return res
      .status(200)
      .json(new ApiResponse(users, "Users retrieved successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json(new ApiError("User not found", 404));
    }
    await user.remove();
    return res
      .status(200)
      .json(new ApiResponse({}, "User deleted successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const getAllProjects = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const projects = await Project.find();
    return res
      .status(200)
      .json(new ApiResponse(projects, "Projects retrieved successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const deleteProject = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json(new ApiError("Project not found", 404));
    }
    return res
      .status(200)
      .json(new ApiResponse(null, "Project deleted successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});
