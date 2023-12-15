import express from "express";
import signupDetails from "../../controllers/auth/signup.js";
import login from "../../controllers/auth/login.js";
import {
  resetPassword,
  changePassword,
} from "../../controllers/auth/changePassword.js";

const router = express.Router();

router.route("/signup").post(signupDetails);
router.route("/login").post(login);
router.route("/resetPassword").post(resetPassword);
router.route("/changePassword").post(changePassword);

export default router;
