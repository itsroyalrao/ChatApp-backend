import Chat from "../../models/chat/chat.js";

const postChats = async (req, res) => {
  try {
    const { message, email } = req.body;
    const chat = await Chat.create({
      msg: message,
      email,
      createdAt: new Date().toLocaleTimeString("en-IN"),
    });
    res.json({ success: true, msg: "posted data" });
  } catch (e) {
    console.log(e);
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({});
    res.json({ success: true, chats: chats });
  } catch (e) {
    console.log(e);
  }
};

export { postChats, getChats };
