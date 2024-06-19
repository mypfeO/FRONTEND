// src/Components/FormFooterSection.jsx

import React from 'react';
import { Typography, Paper, TextField, IconButton } from '@mui/material';
import { useDrop } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import './Styles/FormFooterSectionStyles.css'; // Import the CSS file for footer component

const FormFooterSection = ({ formFooter, setFormFooter }) => {
  console.log("formFooter", formFooter);
  const [{ isOver: isFooterOver }, footerDrop] = useDrop(() => ({
    accept: 'FORM_TEXT_FIELD',
    drop: (item) => handleAddFooterItem(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleAddFooterItem = () => {
    setFormFooter(prev => (prev ? [...prev, { titre: '', linkNextForm: '' }] : [{ titre: '', linkNextForm: '' }]));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFooter = [...formFooter];
    updatedFooter[index][name] = value;
    setFormFooter(updatedFooter);
  };

  const handleRemoveFooterItem = (index) => {
    const updatedFooter = formFooter.filter((_, i) => i !== index);
    setFormFooter(updatedFooter);
  };

  return (
    <div className="footer-section-container">
      <Typography variant="h5" className="empty-message">Form Footer</Typography>
      <div ref={footerDrop} className={`paper-container ${isFooterOver ? 'hover' : ''}`}>
        {formFooter && formFooter.length > 0 ? (
          formFooter.map((item, index) => (
            <div key={index} className="footer-item">
              <TextField
                name="titre"
                label="Title"
                variant="outlined"
                value={item.titre}
                onChange={(e) => handleInputChange(index, e)}
                className="custom-text-field"
                margin="normal"
              /> 
           
              <TextField
                name="linkNextForm"
                label="Link "
                variant="outlined"
                value={item.linkNextForm}
                onChange={(e) => handleInputChange(index, e)}
                className="custom-text-field"
                margin="normal"
              />
              <IconButton onClick={() => handleRemoveFooterItem(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </div>
          ))
        ) : (
          <div className="empty-message">Drag a text field here for the footer</div>
        )}
      </div>
    </div>
  );
};

export default FormFooterSection;
