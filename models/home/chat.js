import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default mongoose.model("chat", chatSchema);
