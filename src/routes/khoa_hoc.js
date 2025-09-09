const express = require('express');

const router = express.Router();

const Khoa_hocController = require('../app/controllers/Khoa_hocController.js');

router.get('/create', Khoa_hocController.create);
router.post('/store', Khoa_hocController.store);
router.get('/:slug', Khoa_hocController.show);
router.get('/', Khoa_hocController.index);
module.exports = router;
