const bodyParser = require('body-parser');
const UserController = require('./api/users/user.controller');
const comments = require('./api/comments/comments.controller');
const posts = require('./api/posts/post.controller');

const express = require('express');
const app = express();
const port = 3000;

const Users = UserController.UserController;

app.use(bodyParser.urlencoded(({limit:'50mb', extended: false})));

app.use(bodyParser.json());

app.get('/users', Users.GetAllUsers);

app.get('/users/:userid', Users.GetUserById)

app.put('/users', Users.UpdateUser)

app.listen(port, () => console.log(`Payoda app listening on port ${port}!`))