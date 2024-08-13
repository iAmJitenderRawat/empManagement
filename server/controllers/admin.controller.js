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
  if (req.user.userRole !== "admin") {
    return res.status(403).json(new ApiError("Access denied", 403));
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;
  const gender = req?.query?.gender;
  const search = req?.query?.search;
  const sortField = req?.query?.sortField ?? "firstName";
  const sortOrder = req?.query?.sortOrder ?? "asc";

  const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  const searchText = /^[a-zA-Z]+$/;
  const query = {};

  if (search) {
    if (alphanumericRegex.test(search)) {
      query._id = search;
    } else if(searchText.test(search)) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }
  }

  if (gender) {
    query.gender = gender;
  }
  const sortOptions = {};
  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

  if (page < 1) {
    return res.status(400).json(new ApiError("Page can't be less than 1", 403));
  }
  try {
    const users = await User.find(query)
      .sort(sortOptions)
      .select("-password -refreshToken")
      .skip(skip)
      .limit(limit);
    const totalUsers = await User.countDocuments();
    return res.status(200).json(
      new ApiResponse(
        {
          users,
          totalUsers,
          totalPages: Math.ceil(totalUsers / limit),
          currentPage: page,
          limit,
        },
        "Users retrieved successfully",
        200
      )
    );
  } catch (error) {
    // return res.status(400).json(new ApiError(error.message, 400));
    return res.status(400).json(new ApiError("Invalid search query", 400));
  }
});

export const userDetail = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }

    const id = req?.params?.id;
    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json(new ApiError("User not found", 404));
    }
    return res
      .status(200)
      .json(new ApiResponse({ user }, "User retrieved successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const id = req?.params?.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json(new ApiError("User not found", 404));
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password -refreshToken");
    return res
      .status(200)
      .json(new ApiResponse(updatedUser, "User updated successfully", 200));
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
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse({}, "User deleted successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const createUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    if(!req.body.email) {
      return res.status(400).json(new ApiError("Email is required", 400));
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json(new ApiError("User already exists", 400));
    }
    
    const user = await User.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(user, "User created successfully", 201));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const getAllProjects = asyncHandler(async (req, res) => {
  if (req.user.userRole !== "admin") {
    return res.status(403).json(new ApiError("Access denied", 403));
  }
  const page = parseInt(req.query.page) ?? 1;
  const limit = parseInt(req.query.limit) ?? 8;
  const skip = (page - 1) * limit;
  const search = req?.query?.search;
  const priority = req?.query?.priority;
  const status = req?.query?.status;
  const sortField = req?.query?.sortField ?? "name";
  const sortOrder = req?.query?.sortOrder ?? "asc";

  const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  const searchText = /^[a-zA-Z]+$/;
  const query = {};

  if (search) {
    if (alphanumericRegex.test(search)) {
      query._id = search;
    } else if(searchText.test(search)) {
      query.name= { $regex: search, $options: "i" } ;
    }else {
      return res.status(400).json(new ApiError("Invalid search query", 400));
    }
  }

  if (priority) {
    query.priority = priority;
  }

  if (status) {
    query.status = status;
  }

  const sortOptions = {};
  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
  if (page < 1) {
    return res.status(400).json(new ApiError("Page can't be less than 1", 403));
  }

  try {
    const projects = await Project.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    const totalProjects = await Project.countDocuments();

    return res.status(200).json(
      new ApiResponse(
        {
          projects,
          totalProjects,
          totalPages: Math.ceil(totalProjects / limit),
          currentPage: page,
          limit,
        },
        "Projects retrieved successfully",
        200
      )
    );
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const getProject = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json(new ApiError("Project not found", 404));
    }
    return res
      .status(200)
      .json(new ApiResponse(project, "Project retrieved successfully", 200));
  } catch (error) {
    return res.status(400).json(new ApiError(error.message, 400));
  }
});

export const updateProject = asyncHandler(async (req, res) => {
  try {
    if (req.user.userRole !== "admin") {
      return res.status(403).json(new ApiError("Access denied", 403));
    }
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json(new ApiError("Project not found", 404));
    }
    return res
      .status(200)
      .json(new ApiResponse(project, "Project updated successfully", 200));
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
