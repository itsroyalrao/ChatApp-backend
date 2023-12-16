console.clear();

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth/auth.js";
import homeRoutes from "./routes/home/homepage.js";
import chatRoutes from "./routes/home/chats.js";
import profileRoutes from "./routes/profile/profile.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chatt-appp.netlify.app"],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/chats", chatRoutes);
app.use("/profile", profileRoutes);

io.on("connection", (socket) => {
  socket.on("add_yourself", (email) => {
    socket.join(email);
    console.log(email, "room joined");
  });
  socket.on("join_room", (data) => {
    socket.join(data.id);
    console.log(data.id, "room joined");
  });
  // console.log("A user is connected", socket.id);
  socket.on("send_message", (data) => {
    socket.to(data[1]).emit("receive_message", data[0]);
  });
  // socket.on("disconnect", () => {
  //   console.log("A user is disconnected");
  // });
});

const port = 3000;
(async () => {
  await connectDB(process.env.MONGO_URI);
  server.listen(port, () => console.log(`Server listening on port ${port}!`));
})();
