const { MongoClient } = require("mongodb");
const Db = process.env.DATABASE_CONNECTION;
const client = new MongoClient(Db, {
  //Learn this to...
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("fetch");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
//...this
