import dotenv from "dotenv";
dotenv.config();
export const accessCookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: process.env.ACCESS_TOKEN_MAX_AGE,
  sameSite: "none",
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: process.env.REFRESH_TOKEN_MAX_AGE,
  sameSite: process.env.SAME_SITE,
};
