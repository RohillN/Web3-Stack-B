var express = require('express');
var router = express.Router();

module.exports = {
  index(req, res) {
    return res.status(200).send('GET [INDEX]: respond with a resource');
  },
  add(req, res){
    return res.status(200).send('ADD: respond with a resource');
  },
  edit(req, res){
    return res.status(200).send('EDIT: respond with a resource');
  },
  delete(req, res){
    return res.status(200).send('DELETE: respond with a resource');
  }
}

