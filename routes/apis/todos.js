import expres from "express";
import fs from "fs";
import { checkExist } from "../../middlewares/todo.middleware";

const router = expres.Router();

const todoPath = "./dev-data/todos.json";

let todosData = JSON.parse(fs.readFileSync(todoPath, "utf-8"));

router.get("/", (req, res) => {
  res.json(todosData);
});
router.get("/:id", checkExist, (req, res) => {
  const { id } = req.params;

  const resultTodo = todosData.find((todo) => todo.id === +id);
  res.json(resultTodo);
});

router.post("/", checkExist, (req, res) => {
  const { title } = req.body;
  let index = todosData.findIndex((todo) => todo.title === title);
  if (index === -1) {
    let newTodo = {
      userId: Date.now() + 1,
      id: Date.now(),
      title: title,
      completed: false,
    };
    todosData.push(newTodo);
    fs.writeFileSync(todoPath, JSON.stringify(todosData));
    res.json({ message: "Create successfully" });
  } else {
    res.json({ message: "Todo already exists" });
  }
});

router.put("/:id", checkExist, (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  let index = todosData.findIndex((todo) => todo.id == id);

  todosData[index].completed = completed;
  todosData[index].title = title;

  fs.writeFileSync(todoPath, JSON.stringify(todosData));
  res.json({ message: "Update successfully" });
});

router.delete("/:id", checkExist, (req, res) => {
  const { id } = req.params;
  const index = todosData.findIndex((todo) => todo.id === +id);

  todosData = todosData.filter((todo) => todo.id !== +id);
  fs.writeFileSync(todoPath, JSON.stringify(todosData));
  res.json({ message: "Delete successfully" });
});
module.exports = router;
