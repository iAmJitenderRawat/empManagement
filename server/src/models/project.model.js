import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    timeline: {
      type: Number,
      required: true,
    },
    teamLead: {
      type: String,
    },
    teamMembers: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Project= mongoose.model("Project", projectSchema);