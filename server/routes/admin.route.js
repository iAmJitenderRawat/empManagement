import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProject, createUser, deleteProject, deleteUser, getAllProjects, getAllUsers, updateUser, userDetail } from "../controllers/admin.controller.js";

const router = Router();
//users
router.route("/users").get(verifyJWT, getAllUsers);
router.route("/users/:id").get(verifyJWT, userDetail);
router.route("/users/addUser").post(verifyJWT, createUser);
router.route("/deleteUser/:id").delete(verifyJWT, deleteUser);
router.route("/updateUser/:id").patch(verifyJWT, updateUser);

//projects
router.route("/addProject").post(verifyJWT, addProject);
router.route("/projects").get(verifyJWT, getAllProjects);
router.route("/deleteProject").delete(verifyJWT, deleteProject);

export default router;