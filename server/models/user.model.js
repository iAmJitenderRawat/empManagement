import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    url:  String,
    public_id: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  refreshToken: {
    type: String,
  },
  isAvaiable:{
    type:Boolean,
    default:true,
  },
},{timestamps:true});

export const User= mongoose.model("User", userSchema);