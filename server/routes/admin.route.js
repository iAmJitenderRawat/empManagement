import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProject, deleteProject, deleteUser, getAllProjects, getAllUsers } from "../controllers/admin.controller.js";

const router = Router();
//users
router.route("/users").get(verifyJWT, getAllUsers);
router.route("/deleteUser/:id").delete(verifyJWT, deleteUser);

//projects
router.route("/addProject").post(verifyJWT, addProject);
router.route("/projects").get(verifyJWT, getAllProjects);
router.route("/deleteProject").delete(verifyJWT, deleteProject);

export default router;