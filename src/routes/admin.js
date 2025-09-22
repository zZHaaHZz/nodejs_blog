const express = require('express');

const router = express.Router();

const Admincontroller = require('../app/controllers/Admincontroller');

router.get('/', Admincontroller.admin);

module.exports = router;
