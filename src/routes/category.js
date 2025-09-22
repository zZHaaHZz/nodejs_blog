const express = require('express');

const router = express.Router();


const CategoryController = require('../app/controllers/CategoryController');

router.get('/create', CategoryController.createCategory);
router.get('/', CategoryController.ShowCategory);

module.exports = router;
