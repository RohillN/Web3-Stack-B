var express = require('express');
var router = express.Router();

module.exports = {
  index(req, res){
    return res.status(200).send('respond with a resource');
  }
}

