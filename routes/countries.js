var express = require('express');
var router = express.Router();
const countriesController = require('../controllers/countries');

router.get('/', countriesController.index);
router.get('/add', countriesController.add);
router.get('/edit', countriesController.edit);
router.get('/delete', countriesController.delete);

module.exports = router;
