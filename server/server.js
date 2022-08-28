const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var users = [{ name: "charlie" }, { name: "blake" }];

app.get("/api", (req, res) => {
  res.json(users);
});

app.post("/api", (req, res) => {
  let newUser = {
    name: req.body.name,
  };
  users.push(newUser);
  res.json("ok");
});

app.listen(5000);
