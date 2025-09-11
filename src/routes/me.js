const express = require('express');

const router = express.Router();

const MeController = require('../app/controllers/MeController');

router.get('/stored/courses', MeController.index);

router.get('/trash/courses', MeController.trash);

router.get('/', MeController.index);

module.exports = router;
