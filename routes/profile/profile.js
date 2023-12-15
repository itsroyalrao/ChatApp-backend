import express from "express";
import getUserDetails from "../../controllers/profile/profile.js";

const router = express.Router();

router.route("/").get(getUserDetails);

export default router;
