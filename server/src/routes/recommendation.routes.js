const { Router } = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const controller = require('../controllers/recommendation.controller');

const router = Router();

router.get('/', authenticate, controller.getRecommendations);
router.post('/train', authenticate, authorize('admin'), controller.train);

module.exports = router;
