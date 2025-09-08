const express = require('express');

const router = express.Router();

const MovieController = require('../app/controllers/MovieController.js');
router.use('/', MovieController.index);

module.exports = router;
