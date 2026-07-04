const { Router } = require('express');
const { authenticate } = require('../middleware/auth');
const controller = require('../controllers/message.controller');

const router = Router();

router.post('/', authenticate, controller.send);
router.get('/', authenticate, controller.getConversations);
router.get('/conversation/:userId', authenticate, controller.getConversation);
router.put('/:id/read', authenticate, controller.markRead);
router.put('/conversation/:userId/read', authenticate, controller.markConversationRead);

module.exports = router;
