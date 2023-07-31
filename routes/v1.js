import express from "express";
import todos from "./apis/todos";
const router = express.Router();

router.use("/todos", todos);

module.exports = router;
