// src/Components/SubmissionModal.js

import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { ChromePicker } from 'react-color';
import { encodeMultipleFilesToBase64, encodeFileToBase64 } from './utils';
import './Styles/SubmissionModalStyles.css';

const SubmissionModal = ({ open, handleClose, handleSubmit }) => {
  const [design, setDesign] = useState({
    backgroundColor: '#ffffff',
    productsImages: [],
    logo: null,
    excelFileLink: ''
  });

  const handleBackgroundColorChange = (color) => {
    setDesign({ ...design, backgroundColor: color.hex });
  };

  const handleProductsImagesChange = async (event) => {
    const files = Array.from(event.target.files);
    console.log('Selected product images:', files); // Log selected files
    const base64Images = await encodeMultipleFilesToBase64(files);
    setDesign({ ...design, productsImages: base64Images });
  };

  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    console.log('Selected logo:', file); // Log selected file
    if (file) {
      const base64Logo = await encodeFileToBase64(file);
      setDesign({ ...design, logo: base64Logo });
    }
  };

  const handleExcelChange = (event) => {
    setDesign({ ...design, excelFileLink: event.target.value });
  };

  const handleModalSubmit = () => {
    handleSubmit(design);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="submission-modal-title"
      aria-describedby="submission-modal-description"
    >
      <Box className="modal-box">
        <Typography id="submission-modal-title" variant="h6" component="h2">
          Form Submission
        </Typography>
        <Typography id="submission-modal-description" sx={{ mt: 2 }}>
          Your form has been submitted successfully. Please provide additional details.
        </Typography>
        
        <Box className="modal-field">
          <Typography variant="subtitle1">Background Color:</Typography>
          <ChromePicker
            color={design.backgroundColor}
            onChangeComplete={handleBackgroundColorChange}
            className="color-picker"
          />
        </Box>
        
        <Box className="modal-field">
          <Typography variant="subtitle1">Products Images:</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleProductsImagesChange}
            className="file-input"
          />
        </Box>
        
        <Box className="modal-field">
          <Typography variant="subtitle1">Logo:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="file-input"
          />
        </Box>

        <Box className="modal-field">
          <Typography variant="subtitle1">Excel File Link:</Typography>
          <TextField
            fullWidth
            value={design.excelFileLink}
            onChange={handleExcelChange}
            placeholder="Enter Excel file link"
          />
        </Box>
        
        <Box className="modal-actions">
          <Button onClick={handleModalSubmit} variant="contained" color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubmissionModal;
