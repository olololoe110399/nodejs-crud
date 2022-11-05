const TodoModel = require("../models/todo.model");
const TodoService = {};

TodoService.getAllTodos = () => {
  return TodoModel.find({});
};

module.exports = TodoService;
