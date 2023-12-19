import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  users: {
    type: Array,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
});

export default mongoose.model("room", roomSchema);
