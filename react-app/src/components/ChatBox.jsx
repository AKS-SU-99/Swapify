import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';

function ChatBox({ productId, sellerId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useContext(SocketContext);
  const currentUserId = localStorage.getItem('userId');

  // Load existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/chat/${productId}`);
        setMessages(res.data.chats);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };
    fetchMessages();
  }, [productId]);

  // Socket.io real-time setup
  useEffect(() => {
    if (!socket) return;

    // Join product chat room
    socket.emit('join-product-chat', productId);

    // Listen for new messages
    socket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('new-message');
    };
  }, [socket, productId]);

  const handleSend = () => {
    if (!newMessage.trim() || !socket) return;

    // Optimistic UI update
    const tempMessage = {
      _id: Date.now().toString(),
      sender: currentUserId,
      message: newMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, tempMessage]);

    // Send via Socket.io
    socket.emit('send-message', {
      senderId: currentUserId,
      receiverId: sellerId,
      productId,
      message: newMessage
    });

    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div 
            key={msg._id} 
            className={`message ${msg.sender === currentUserId ? 'sent' : 'received'}`}
          >
            <p>{msg.message}</p>
            <small>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
export default ChatBox;