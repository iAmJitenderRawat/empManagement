import { Router } from "express";
import {
    changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUser,
  uploadOrUpdateAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

// secure routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refreshAccessToken").post(verifyJWT,refreshAccessToken);
router.route("/changePassword").post(verifyJWT, changePassword);
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);
router.route("/updateUser").patch(verifyJWT, updateUser);
router
  .route("/uploadAvatar")
  .patch(verifyJWT, upload.single("avatar"), uploadOrUpdateAvatar);

export default router;
