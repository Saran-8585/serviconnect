const Message = require('../models/message.model');
const AppError = require('../utils/appError');

exports.send = async (req, res, next) => {
  try {
    const { receiver_id, booking_id, content } = req.body;

    if (!receiver_id || !content) {
      throw new AppError('Receiver and content are required.', 400);
    }

    const message = await Message.create({
      sender_id: req.user.id,
      receiver_id,
      booking_id: booking_id || null,
      content,
    });

    res.status(201).json({ message: 'Message sent.', data: message });
  } catch (error) {
    next(error);
  }
};

exports.getConversation = async (req, res, next) => {
  try {
    const otherUserId = req.params.userId;
    const messages = await Message.getConversation(req.user.id, otherUserId);
    res.json({ messages });
  } catch (error) {
    next(error);
  }
};

exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await Message.getConversationsForUser(req.user.id);
    const unread = await Message.getUnreadCount(req.user.id);
    res.json({ conversations, unread: unread?.count || 0 });
  } catch (error) {
    next(error);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    await Message.markAsRead(req.params.id);
    res.json({ message: 'Marked as read.' });
  } catch (error) {
    next(error);
  }
};

exports.markConversationRead = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await Message.markConversationAsRead(req.user.id, userId);
    res.json({ message: 'Conversation marked as read.' });
  } catch (error) {
    next(error);
  }
};
