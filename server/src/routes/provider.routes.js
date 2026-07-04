const { Router } = require('express');
const controller = require('../controllers/provider.controller');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
