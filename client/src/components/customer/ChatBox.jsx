import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { messages as messagesApi } from '../../lib/api';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import styles from './ChatBox.module.css';

export default function ChatBox({ provider, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  const otherUserId = provider.user_id;

  useEffect(() => {
    messagesApi.getConversation(otherUserId)
      .then((res) => {
        setMessages(res.data.messages);
        setLoading(false);
        messagesApi.markConversationRead(otherUserId).catch(() => {});
      })
      .catch(() => setLoading(false));
  }, [otherUserId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await messagesApi.send({
        receiver_id: otherUserId,
        content: newMessage.trim(),
      });
      setMessages((prev) => [...prev, res.data.data]);
      setNewMessage('');
    } catch {
      // silently fail
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.chatbox}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.avatar}>
              {provider.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className={styles.providerName}>{provider.business_name}</h3>
              <p className={styles.status}>Online</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.messages} ref={listRef}>
          {loading && <p className={styles.loading}>Loading messages...</p>}
          {!loading && messages.length === 0 && (
            <p className={styles.empty}>Send a message to start the conversation.</p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.sender_id === user.id ? styles.sent : styles.received
              }`}
            >
              <div className={styles.bubble}>
                <p className={styles.text}>{msg.content}</p>
                <span className={styles.time}>
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form className={styles.inputBar} onSubmit={handleSend}>
          <input
            className={styles.input}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="sm" disabled={!newMessage.trim() || sending}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
