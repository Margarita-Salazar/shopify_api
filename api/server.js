const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth_router");
const imagesRouter = require("./images/router");
const restricted = require("./middleware/restricted");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/images", restricted, imagesRouter);

server.use("*", (req, res) => {
    res.send("<h1>Server is Up</h1>");
});
server.use((err, req, res, next) => {
    // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;
