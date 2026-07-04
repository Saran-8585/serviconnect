const db = require('../config/database');

const Message = {
  create(data) {
    return db('messages').insert(data).then((ids) => this.findById(ids[0]));
  },

  findById(id) {
    return db('messages')
      .join('users as sender', 'messages.sender_id', 'sender.id')
      .join('users as receiver', 'messages.receiver_id', 'receiver.id')
      .where('messages.id', id)
      .select(
        'messages.*',
        'sender.name as sender_name',
        'receiver.name as receiver_name'
      )
      .first();
  },

  getConversation(userId1, userId2, { page = 1, limit = 50 } = {}) {
    return db('messages')
      .join('users as sender', 'messages.sender_id', 'sender.id')
      .where(function () {
        this.where({ sender_id: userId1, receiver_id: userId2 }).orWhere({
          sender_id: userId2,
          receiver_id: userId1,
        });
      })
      .select(
        'messages.*',
        'sender.name as sender_name'
      )
      .orderBy('messages.created_at', 'asc')
      .limit(limit)
      .offset((page - 1) * limit);
  },

  getConversationsForUser(userId) {
    return db('messages')
      .join('users as other', function () {
        this.on('messages.sender_id', '=', 'other.id')
          .orOn('messages.receiver_id', '=', 'other.id');
      })
      .where(function () {
        this.where('messages.sender_id', userId).orWhere('messages.receiver_id', userId);
      })
      .where('other.id', '!=', userId)
      .select('other.id as other_user_id', 'other.name as other_name')
      .groupBy('other.id')
      .orderByRaw('MAX(messages.created_at) DESC');
  },

  markAsRead(messageId) {
    return db('messages')
      .where({ id: messageId })
      .update({ read_at: db.fn.now() });
  },

  markConversationAsRead(userId, otherUserId) {
    return db('messages')
      .where({ sender_id: otherUserId, receiver_id: userId })
      .whereNull('read_at')
      .update({ read_at: db.fn.now() });
  },

  getUnreadCount(userId) {
    return db('messages')
      .where({ receiver_id: userId })
      .whereNull('read_at')
      .count({ count: '*' })
      .first();
  },
};

module.exports = Message;
