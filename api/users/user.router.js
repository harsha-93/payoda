const express = require('express');
const controller = require('./user.controller')

const router = express.Router();

router.get('/', controller.GetUsers)

exports.router=  router;