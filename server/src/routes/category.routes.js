const { Router } = require('express');
const controller = require('../controllers/category.controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/slug/:slug', controller.getBySlug);

module.exports = router;
