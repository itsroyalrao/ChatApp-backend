import express from "express";
import { postChats, getChats } from "../../controllers/home/chats.js";

const router = express.Router();

router.route("/").post(postChats).get(getChats);

export default router;
