const mongoose = require("mongoose");

const { Schema } = mongoose;

const TodoScheme = Schema({
  name: String,
});

const TodoModel = mongoose.model("Todos", TodoScheme, "todos");

module.exports = TodoModel;
