const express = require('express');
const router = express.Router();
const coursesController = require('./courses.controller');

router.post('/', coursesController.create);
router.get('/:name', coursesController.get);
router.get('/', coursesController.list);

module.exports = router;
