import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    priority: {
      type: String,
      enum: ["low", "high"],
      default: "low",
    },
    timeline: {
      type: Number,
      required: true,
    },
    projectLead: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    projectManager: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
      trim: true,
    },
    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    notes: {
      type: [String],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
