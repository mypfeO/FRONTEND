import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Snackbar } from '@mui/material';

const CreatePageweb = ({ open, handleClose, handleCreatePage, adminId }) => {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      const newPage = { name, theme, admin: adminId };
      await handleCreatePage(newPage);
      setName('');
      setTheme('');
      setSuccessMessage('Page web created successfully');
      setErrorMessage(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(' ');
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage('Failed to create page');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ width: 400, margin: 'auto', marginTop: '20%', bgcolor: 'background.paper', padding: 4, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Create New Page Web
        </Typography>
        <Box id="modal-description" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
          Create
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
          Close
        </Button>
        <Snackbar
          open={Boolean(errorMessage)}
          message={errorMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        />
        <Snackbar
          open={Boolean(successMessage)}
          message={successMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </Modal>
  );
};

export default CreatePageweb;
