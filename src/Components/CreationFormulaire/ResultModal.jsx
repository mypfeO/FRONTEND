import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import './Styles/ResultModalStyles.css';
import { Navigate } from 'react-router-dom';

const ResultModal = ({ open, handleClose, result,formId,siteWebId }) => {
  const handleCopy = () => {
    if (result && result.formUrl) {
      navigator.clipboard.writeText(result.formUrl);
      alert('Form URL copied to clipboard!');
    } else {
      alert('Form URL is not available to copy.');
    }
  };

  const handlePreview = () => {
    
      Navigate(`/preview-form/${siteWebId}/${formId}`);
    } 

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="result-modal-title"
      aria-describedby="result-modal-description"
    >
      <Box className="modal-box">
        <Typography id="result-modal-title" variant="h6" component="h2">
          Submission Result
        </Typography>
        <Typography id="result-modal-description" sx={{ mt: 2 }}>
          {result ? result.message : 'No result message available.'}
        </Typography>
        <Box className="modal-field">
          <Typography variant="subtitle1">Form URL:</Typography>
          <TextField
            fullWidth
            value={result ? result.formUrl : 'No URL available'}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box className="modal-actions">
          <Button onClick={handleCopy} variant="contained" color="primary">
            Copy URL
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
            Close
          </Button>
          <Button onClick={handlePreview} variant="contained" color="primary">
            Preview form
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ResultModal;
