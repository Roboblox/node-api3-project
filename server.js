const express = require("express");

const server = express();

server.use(express.json());

//Router import Here
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

module.exports = server;
