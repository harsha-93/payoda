var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/master";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database Conncected");
    var dbo = db.db("master");
    dbo.dropCollection('users', (err, res) => {});
    dbo.dropCollection('posts', (err, res) => {});
    db.close();
});