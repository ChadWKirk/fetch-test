const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get driver connection
const dbo = require("./db/conn");
const { response } = require("express");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

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

app.get("/api/user/:id", (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("fetch").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/api", (req, response) => {
  let db_connect = dbo.getDb();
  let newUser = {
    name: req.body.name,
  };
  db_connect.collection("fetch").insertOne(newUser, function (err, res) {
    //create collection "users" and insert newUser
    if (err) throw err;
    response.json(res);
  });

  console.log();
});

app.post("/api/update/:id", (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  let newvalues = { $set: { name: req.body.name } };
  db_connect
    .collection("fetch")
    .updateOne(myQuery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

app.delete("/api/:id", (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("fetch").deleteOne(myQuery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
