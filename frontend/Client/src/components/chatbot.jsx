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
    <Card sx={{ position: 'fixed', right: 100, bottom: 70, width: '500px', height: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ textAlign: msg.sender === 'user' ? 'right' : 'left', my: 1 }}>
            <Typography variant="body1"><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</Typography>
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
        <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
      </CardActions>
    </Card>
  );
};

export default ChatBox;
