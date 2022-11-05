const TodoModel = require("../models/todo.model");
const TodoService = {};

TodoService.getAllTodos = () => {
  return TodoModel.default.find({});
};

export default TodoService;
