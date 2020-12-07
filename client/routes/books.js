var express = require('express');
var router = express.Router();
var controller = require('../controller/books');

router.get('/', controller.getList);
router.get('/:uuid', controller.get);
router.post('/:uuid', controller.post);

module.exports = router;
