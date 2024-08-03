export const accessCookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: process.env.ACCESS_TOKEN_MAX_AGE,
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: process.env.REFRESH_TOKEN_MAX_AGE,
};
