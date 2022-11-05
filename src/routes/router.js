const express = require("express");

const todoRouter = require("./todo.router");

const apiRoute = express();

apiRoute.use("/todo", todoRouter.default);

export default apiRoute;
