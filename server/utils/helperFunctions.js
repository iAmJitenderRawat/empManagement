import { User } from "../models/user.model.js";

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export const generateAccessAndRefreshToken= async (userId)=>{
    try {
        const user = await User.findById(userId).select("-refreshToken");
        const accessToken = await user.generateAccessToken(userId);
        const refreshToken = await user.generateRefreshToken(userId);
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken, refreshToken};
    } catch (error) {
        return {message:error.message};
    }
}

export const generateAccessToken= async (userId)=>{
    try {
        const user = await User.findById(userId).select("-refreshToken");
        const accessToken = await user.generateAccessToken(userId);
        return {accessToken};
    } catch (error) {
        return {message:error.message};
    }
}