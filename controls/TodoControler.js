const TodoModel = require("../model/TodoModel");

module.exports.getToDos = async (req, res) => {
  try {
    const toDos = await TodoModel.find(); // Add parentheses to call the find() function
    res.send(toDos);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, msg: "Something went wrong" });
  }
};

module.exports.saveToDos = (req, res) => {
  const { toDo } = req.body;

  TodoModel.create({ toDo })
    .then((data) => {
      console.log("saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.updateToDos = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  TodoModel.findByIdAndUpdate(id, { toDo }, { new: true }) // Pass an object with the field to update
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).send({ msg: "ToDo not found" });
      }
      res.send("Updated successfully: " + updatedTodo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.deleteToDos = (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("delete successfully...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
