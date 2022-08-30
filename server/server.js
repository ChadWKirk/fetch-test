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

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
//...this

app.get("/api", (req, res) => {
  let db_connect = dbo.getDb();
  //const projection = { name: 1, _id: 0 };
  db_connect
    .collection("fetch")
    .find()
    // .project(projection)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
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

app.delete("/api", (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("fetch").deleteOne(myQuery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

//Old post request handler
// app.post("/api", (req, res) => {
//   let newUser = {
//     name: req.body.name,
//   };
//   users.push(newUser);
//   res.json("ok");
// });
