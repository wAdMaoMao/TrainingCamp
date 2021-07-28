/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-28 15:19:14
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-28 17:47:40
 */
const express = require("express");
const cors = require("cors");
const cp = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 9000;
let shell;
let isRunning = false; // 是否已经执行过 npm run serve

app.use(cors());
app.use(express.json());

app.post("/runnerApi", (req, res) => {
  console.log("Run");
  const data = new Uint8Array(
    Buffer.from("/* eslint-disable */\n" + req.body.content)
  );
  fs.writeFileSync(path.resolve("src", "components", "target.vue"), data);
  console.log(`isRunning: ${isRunning}`);
  if (isRunning) {
    res.send({
      code: "200",
      data: "Already started!",
      message: "Already started!"
    });
    return;
  }
  shell = cp.spawn("npm", ["run", "serve", "--", "--port", "9090"]);

  shell.stdout.on("data", (data) => {
    if (!isRunning && data.includes("http://localhost")) {
      isRunning = true;
      res.send({
        code: "200",
        data: "started",
        message: "started"
      });
    }
  });

  shell.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  shell.on("error", (err) => {
    console.log(`child process exited with err ${err}`);
  });

  shell.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.post("/saveApi", (req, res) => {
  console.log(req.body);
  const data = new Uint8Array(
    Buffer.from("/* eslint-disable */\n" + req.body.content)
  );
  fs.writeFileSync(path.resolve("src", "components", "target.vue"), data);
  setInterval(() => {
    res.send({
      code: "200",
      data: "success",
      message: "success"
    });
  }, 500);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});