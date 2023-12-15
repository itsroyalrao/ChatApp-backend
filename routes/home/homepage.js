import express from "express";
import { getFriends, getFriend } from "../../controllers/home/homepage.js";

const router = express.Router();

router.route("/").get(getFriends).post(getFriend);

export default router;
