const express = require('express');

const router = express.Router();


const BrandController = require('../app/controllers/BrandController');

router.get('/create', BrandController.createBrand);
router.get('/', BrandController.ShowBrand);

module.exports = router;
