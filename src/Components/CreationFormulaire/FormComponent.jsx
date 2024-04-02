// FormComponent.jsx
import React, { useState } from 'react';
import { Typography, Button, Grid, Paper,Snackbar } from '@mui/material';
import FormTitleSection from './FormTitleSection';
import FormBodySection from './FormBodySection';
import FormFooterSection from './FormFooterSection';
import './Styles/FormComponent.css'; // Import the CSS file

const FormComponent = () => {
  const [formTitle, setFormTitle] = useState(null);
  const [formFooter, setFormFooter] = useState(null);
  const [bodyItems, setBodyItems] = useState([]);
  const [submissionMessageVisible, setSubmissionMessageVisible] = useState(false); // New state for submission message visibility

  const handleAddBodyItem = (title) => {
    const id = Date.now();
    const newBodyItem = { id, title, champText: true };
    setBodyItems((prevItems) => [...prevItems, newBodyItem]);
  };

  const handleRemoveBodyItem = (id) => {
    const newBodyItems = bodyItems.filter(item => item.id !== id);
    setBodyItems(newBodyItems);
  };

  const handleTextFieldChange = (id, newText) => {
    const updatedBodyItems = bodyItems.map(item => {
      if (item.id === id) {
        return { ...item, title: newText };
      }
      return item;
    });
    setBodyItems(updatedBodyItems);
  };

  const handleMoveBodyItem = (dragIndex, hoverIndex) => {
    const dragItem = bodyItems[dragIndex];
    const updatedBodyItems = [...bodyItems];
    updatedBodyItems.splice(dragIndex, 1);
    updatedBodyItems.splice(hoverIndex, 0, dragItem);
    setBodyItems(updatedBodyItems);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { formTitle, formFooter, bodyItems });
    setSubmissionMessageVisible(true); // Show submission message
    setTimeout(() => setSubmissionMessageVisible(false), 3000); // Hide after 3 seconds
  };
  return (
    <Grid container spacing={3} className="form-container">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom className="empty-message">
          Create a Form
        </Typography>
      </Grid>
      <Grid item xs={12} className="form-title-section">
        <Paper elevation={3} className="paper-container">
          <FormTitleSection
            formTitle={formTitle}
            setFormTitle={setFormTitle}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} className="form-body-section">
        <Paper elevation={3} className="paper-container">
          <FormBodySection
            bodyItems={bodyItems}
            handleTextFieldChange={handleTextFieldChange}
            handleRemoveBodyItem={handleRemoveBodyItem}
            handleMoveBodyItem={handleMoveBodyItem}
            handleAddBodyItem={handleAddBodyItem}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} className="form-footer-section">
        <Paper elevation={3} className="paper-container">
          <FormFooterSection
            formFooter={formFooter}
            setFormFooter={setFormFooter}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button" onClick={handleFormSubmit}>
          Submit
        </Button>
        <Snackbar
          open={submissionMessageVisible}
          message="Form submitted"
          autoHideDuration={3000}
        />
      </Grid>
    </Grid>
  );
};

export default FormComponent;
