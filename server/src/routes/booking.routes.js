const { Router } = require('express');
const { authenticate } = require('../middleware/auth');
const controller = require('../controllers/booking.controller');

const router = Router();

router.post('/', authenticate, controller.create);
router.get('/', authenticate, controller.getMyBookings);
router.get('/slots', authenticate, controller.getTimeSlots);
router.get('/:id', authenticate, controller.getById);
router.patch('/:id/status', authenticate, controller.updateStatus);

module.exports = router;
