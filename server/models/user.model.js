import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowecase: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    avatar: {
      secure_url: String,
      public_id: String,
      resource_type: String,
      optimize_url: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    userRole: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    bio: {
      type: String,
      trim: true,
    },
    hobbies: {
      type: [String],
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  return token;
};

export const User = mongoose.model("User", userSchema);
