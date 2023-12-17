import express from "express";
import {
  postChats,
  getChats,
  getRoomID,
} from "../../controllers/home/chats.js";

const router = express.Router();

router.route("/").post(postChats).get(getChats);
router.route("/room").post(getRoomID);

export default router;
