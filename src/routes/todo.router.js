const express = require("express");
const TodoController = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", TodoController.default.getAllTodos);

export default router;
