const express = require('express');
const SellController = require("../app/controllers/sell/SellController");

const router = express.Router();

router.get('/show', SellController.show);

router.get('/admin', SellController.admin);

module.exports = router;