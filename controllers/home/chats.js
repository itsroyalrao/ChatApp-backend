import Chat from "../../models/home/chat.js";
import Room from "../../models/home/room.js";

const postChats = async (req, res) => {
  try {
    const { message, roomID } = req.body;

    await Chat.create({
      msg: message,
      roomID,
      createdAt: new Date().toLocaleTimeString("en-IN"),
    });
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ roomID: req.query.roomID });
    if (chats.length) res.json({ success: true, chats: chats });
    else res.json({ success: false });
  } catch (e) {
    console.log(e);
  }
};

const getRoomID = async (req, res) => {
  try {
    const { email, friend } = req.body;
    const room = await Room.findOne({ users: { $all: [friend, email] } });
    if (!room) {
      const roomID = Math.random();
      await Room.create({ users: [email, friend], roomID });
      return res.json({ success: true, roomID });
    }
    return res.json({ success: true, roomID: room.roomID });
  } catch (e) {
    console.log(e);
  }
};

export { postChats, getChats, getRoomID };

// const room = await Chat.findOne({
//   "room.users": { $all: [friend, email] },
// });
