import { Profanity } from "@2toad/profanity";
import * as dotenv from "dotenv";

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { generateMessage, generateUser } from "./helpers";
import ChatBot from "./chatbot";
import { Author } from "./types";

// const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
const envFile = ".env";
dotenv.config({ path: envFile });
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.ALLOWED_ORIGIN as string;

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = new Server(server, {
  cors: {
    origin: allowedOrigin, // Allow this origin
    methods: ["GET", "POST"],
  },
});

const users = new Map<string, Author>();

const profanity = new Profanity({
  grawlixChar: "*",
  wholeWord: true,
  grawlix: "****",
});

io.on("connection", (socket) => {
  const id = socket.id;
  console.log("a user connected: ", id);

  const user = users.get(id) ?? generateUser();
  users.set(id, user);

  socket.on("disconnect", () => {
    console.log("user disconnected: ", id);
    users.delete(id);
  });

  socket.on("message", (message: string) => {
    console.log(`Received message ${message} from ${user.name}`);
    const filteredMessage = profanity.censor(message);
    io.emit(
      "new-message",
      generateMessage({ content: filteredMessage, author: user })
    );
  });
});

const chatBot = new ChatBot(io);
chatBot.start();

server.listen(port, () => {
  console.log(`listening on ${port}, allowed origin: ${allowedOrigin}`);
});
