const todoPath = "./dev-data/todos.json";
import fs from "fs";

let todosData = JSON.parse(fs.readFileSync(todoPath, "utf-8"));

module.exports = {
  checkExist: (req, res, next) => {
    const METHOD = req.method;
    const { id } = req.params;
    const { title } = req.body;
    let indexTodo = todosData.findIndex((todo) => todo.id == id);
    let indexTitle = todosData.findIndex((todo) => todo.title == title);
    // if (indexTodo == -1 && id !== undefined) {
    //   res.json({ message: "Todo not found”" });
    // } else if (indexTitle == -1 && title !== undefined) {
    //   res.json({ message: "Todo already exists" });
    // }
    if (METHOD == "GET" || METHOD == "PUT" || METHOD == "DELETE") {
      if (indexTodo == -1) {
        res.json({ message: "Todo not found”" });
      }
    } else if (METHOD == "POST") {
      if (indexTitle !== -1 && title !== undefined) {
        res.json({ message: "Todo already exists" });
      }
    }
    next();
  },
};
