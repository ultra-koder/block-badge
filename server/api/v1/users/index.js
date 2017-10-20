const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/:username/balance', userController.getBalance);

router.get('/:username', userController.getUser);
router.get('/', userController.getUsers);
router.get('/:username/badges', userController.getBadgesForUser);
//router.get('/:username/badges/:badgeName', userController.getBadgeForUser);
//router.get('/:username/consumers/', userController.getAuthorizedConsumersForUser);



module.exports = router;
