const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" }); //learn this

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//learn this to...
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
//...this
//old GET stuff
// var users = [{ name: "charlie" }, { name: "blake" }];

app.get("/api", (req, res) => {
  res.json("lets get it");
});

//Learn this...
app.post("/api", (req, response) => {
  let db_connect = dbo.getDb();
  let newUser = {
    name: req.body.name,
  };
  db_connect.collection("fetch").insertOne(newUser, function (err, res) {
    //create collection "users" and instert newUser
    if (err) throw err;
    response.json(res);
  });

  console.log();
});

//Old post request handler
// app.post("/api", (req, res) => {
//   let newUser = {
//     name: req.body.name,
//   };
//   users.push(newUser);
//   res.json("ok");
// });
