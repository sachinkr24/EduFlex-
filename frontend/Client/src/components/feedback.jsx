import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from 'axios';

export default function Feedback({ courseId, text }) { // Corrected prop destructuring
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState(text || '');
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [error, setError] = useState(''); // Added state for error handling

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async () => {
    try {
      const feedbackTrimmed = feedback.trim();
      if (feedbackTrimmed) {
        const response = await fetch(`http://localhost:3000/users/course/feedback/${courseId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Corrected the space issue
          },
          body: JSON.stringify({ feedback: feedbackTrimmed }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit feedback');
        }
  
        const data = await response.json();
        setSubmittedFeedback(feedbackTrimmed);
        setFeedback('');
        handleClose();
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" 
      startIcon={<FeedbackIcon />} 
      onClick={handleOpen}>
        Add Feedback
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="feedback-modal-title">Write your feedback</h2>
          <TextField
            id="feedback-modal-description"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFeedbackSubmit}
            sx={{ mt: 2 }}
          >
            Submit Feedback
          </Button>
          {error && <Typography style={{ color: 'red' }}>{error}</Typography>} {/* Display error message */}
        </Box>
      </Modal>

      {/* {submittedFeedback && (
        <div>
          <Typography variant='h3'>Your Feedback:</Typography>
          <Typography>{submittedFeedback}</Typography>
        </div>
      )} */}
    </div>
  );
};