import express from "express";
import apiConfig from "../routes/index";
const SERVER_PORT = 8000;

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.write("Hello world");
  res.end();
});
server.use("/api", apiConfig);

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
