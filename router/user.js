const express = require('express');

const router = express.Router();

const userController = require('../controller/user');


// POST: user/
router.post('/', userController.createUser);

// GET: user/:id
router.get('/:id', userController.getUser);

module.exports = router;