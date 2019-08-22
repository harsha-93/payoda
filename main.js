const express = require('express');
const app = express();
const port = 3000;
const users = require('./api/users/user.controller');
const comments = require('./api/comments/comments.controller');
const posts = require('./api/posts/post.controller');

// create the connection with mongo
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/master";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database Conncected");
  var dbo = db.db("master");
  dbo.collections((err, data) => {
      console.log(data)
  })
  db.showColle
  db.close();
});
// app.use('/', (req, res) => res.send('Hello World!'));
app.get('/users',users.GetUsers);
//app.use('/comments',comments);
//app.use('/users',posts);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))