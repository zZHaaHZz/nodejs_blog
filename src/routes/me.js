const express = require('express');

const router = express.Router();

const MeController = require('../app/controllers/MeController');

router.get('/stored/course', MeController.index);

router.get('/', MeController.index);

module.exports = router;
