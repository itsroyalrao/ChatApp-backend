import express from "express";
import {
  getFriends,
  getFriend,
  isAuthorized,
} from "../../controllers/home/homepage.js";

const router = express.Router();

router.route("/").get(getFriends).post(getFriend);
router.route("/cookies").post(isAuthorized);

export default router;
