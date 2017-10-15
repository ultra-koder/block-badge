const express = require('express');
const router = express.Router();
const badgesController = require('./badges.controller');

router.post('/', badgesController.create);
router.get('/:name', badgesController.get);
router.get('/', badgesController.list);

module.exports = router;
