import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, CardActions, TextField, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('/api/chat', { message: input });
      const botResponse = response.data.response;
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { sender: 'bot', text: 'Error: Unable to communicate with the server' }]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust opacity and color as needed
        borderRadius: 16,
        width: '500px',
        maxWidth: '90vw',
        maxHeight: '150vh',
        overflow: 'hidden',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', // Add shadow for depth
      }}
    >
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            AI Chat
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </CardActions>
        <CardContent sx={{ flex: 1, overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                my: 1,
                mx: 2,
              }}
            >
              <Typography variant="body1">
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
              </Typography>
            </Box>
          ))}
        </CardContent>
        <CardActions>
          <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            sx={{ mr: 1 }}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ChatBox;
