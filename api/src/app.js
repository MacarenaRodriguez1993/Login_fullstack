const express = require("express");
const morgan = require("morgan");
const server = express();
const routesLogin = require("./router/login");

server.use(morgan("dev"));
server.use(express.json());

server.use("/", routesLogin);

module.exports = server;
