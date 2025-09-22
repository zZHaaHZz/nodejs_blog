const express = require('express');

const router = express.Router();


const ProductController = require('../app/controllers/ProductController');



router.get('/create', ProductController.CreateProduct);
router.get('/', ProductController.ManageProduct);

module.exports = router;
