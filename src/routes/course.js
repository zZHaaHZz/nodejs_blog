const express = require('express');

const router = express.Router();

const CourseController = require('../app/controllers/CourseController.js');

router.get('/create', CourseController.create);
router.post('/store', CourseController.store);
router.get('/:slug', CourseController.show);

router.get('/:id/edit', CourseController.edit);

router.put('/:id', CourseController.update);

router.delete('/:id/delete', CourseController.delete);

router.delete('/:id/force', CourseController.forceDelete);

router.patch('/:id/restore', CourseController.restore);

router.get('/', CourseController.index);

module.exports = router;
