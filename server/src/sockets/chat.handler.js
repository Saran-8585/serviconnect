const Message = require('../models/message.model');

module.exports = function (io) {
  io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on('send_message', async (data) => {
      try {
        const { sender_id, receiver_id, booking_id, content } = data;

        const message = await Message.create({
          sender_id,
          receiver_id,
          booking_id: booking_id || null,
          content,
        });

        io.to(`user:${receiver_id}`).emit('new_message', message);
        io.to(`user:${sender_id}`).emit('new_message', message);
      } catch (err) {
        socket.emit('error', { message: 'Failed to send message.' });
      }
    });

    socket.on('mark_read', async (data) => {
      try {
        const { messageId, userId, otherUserId } = data;

        if (messageId) {
          await Message.markAsRead(messageId);
        } else if (userId && otherUserId) {
          await Message.markConversationAsRead(userId, otherUserId);
        }
      } catch (err) {
        socket.emit('error', { message: 'Failed to mark read.' });
      }
    });

    socket.on('disconnect', () => {});
  });
};
