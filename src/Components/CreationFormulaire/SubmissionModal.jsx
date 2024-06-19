// src/Components/SubmissionModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl } from '@mui/material';
import { ChromePicker } from 'react-color';
import { encodeMultipleFilesToBase64, encodeFileToBase64 } from './utils';
import './Styles/SubmissionModalStyles.css';

const SubmissionModal = ({ open, handleClose, handleSubmit, initialDesign }) => {
  const [design, setDesign] = useState({
    backgroundColor: '#ffffff',
    productImages: [],
    logo: null,
    excelFileLink: '',
    codeBoard: '', // CodeBoard is part of the design state
  });

  useEffect(() => {
    if (initialDesign) {
      setDesign(initialDesign);
    }
  }, [initialDesign]);

  const handleBackgroundColorChange = (color) => {
    setDesign((prevDesign) => ({ ...prevDesign, backgroundColor: color.hex }));
  };

  const handleProductsImagesChange = async (event) => {
    const files = Array.from(event.target.files);
    console.log('Selected product images:', files);
    const base64Images = await encodeMultipleFilesToBase64(files);
    setDesign((prevDesign) => ({ ...prevDesign, productImages: base64Images }));
  };

  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    console.log('Selected logo:', file);
    if (file) {
      const base64Logo = await encodeFileToBase64(file);
      setDesign((prevDesign) => ({ ...prevDesign, logo: base64Logo }));
    }
  };

  const handleExcelChange = (event) => {
    setDesign((prevDesign) => ({ ...prevDesign, excelFileLink: event.target.value }));
  };

  const handleStatisticalPlatformChange = (event) => {
    const value = event.target.value;
    if (value !== 'Google Analytics') {
      setDesign((prevDesign) => ({
        ...prevDesign,
        codeBoard: '', // Clear codeBoard if not Google Analytics
      }));
    }
  };

  const handleCodeBoardChange = (event) => {
    setDesign((prevDesign) => ({ ...prevDesign, codeBoard: event.target.value }));
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
        <Typography
          id="submission-modal-title"
          variant="h6"
          component="h2"
          style={{ color: '#fff' }}
        >
          Form Submission
        </Typography>
        <Typography
          id="submission-modal-description"
          sx={{ mt: 2 }}
          style={{ color: '#fff' }}
        >
          Please provide additional details for the form submission.
        </Typography>
        
        <Box className="modal-field">
          <Typography variant="subtitle1" style={{ color: '#fff' }}>Background Color:</Typography>
          <ChromePicker
            color={design.backgroundColor}
            onChangeComplete={handleBackgroundColorChange}
            className="color-picker"
          />
        </Box>
        
        <Box className="modal-field">
          <Typography variant="subtitle1" style={{ color: '#fff' }}>Products Images:</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleProductsImagesChange}
            className="file-input"
          />
          <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
            {design.productImages && design.productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selected Image ${index + 1}`}
                style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '4px' }}
              />
            ))}
          </Box>
        </Box>
        
        <Box className="modal-field">
          <Typography variant="subtitle1" style={{ color: '#fff' }}>Logo:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="file-input"
          />
          {design.logo && (
            <img
              src={design.logo}
              alt="Logo"
              style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
            />
          )}
        </Box>

        <Box className="modal-field">
          <Typography variant="subtitle1" style={{ color: '#fff' }}>Excel File Link:</Typography>
          <TextField
            fullWidth
            value={design.excelFileLink}
            onChange={handleExcelChange}
            placeholder="Enter Excel file link"
            InputProps={{ style: { color: '#fff' } }}
          />
        </Box>

        <Box className="modal-field">
          <Typography variant="subtitle1" style={{ color: '#fff' }}>Statistical Platform:</Typography>
          <FormControl fullWidth>
            <Select
              value="Google Analytics"
              onChange={handleStatisticalPlatformChange}
              displayEmpty
              style={{ color: '#fff' }}
              inputProps={{
                style: { color: '#fff' }
              }}
            >
              <MenuItem value="Google Analytics">Google Analytics</MenuItem>
              {/* Add more platforms as needed */}
            </Select>
          </FormControl>
        </Box>

        <Box className="modal-field">
          <Typography variant="subtitle1" style={{ color: '#fff' }}>Code Board:</Typography>
          <TextField
            fullWidth
            value={design.codeBoard}
            onChange={handleCodeBoardChange}
            placeholder="Enter Code Board"
            InputProps={{ style: { color: '#fff' } }}
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
