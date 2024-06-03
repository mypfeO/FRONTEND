// src/Components/FormComponent.js

import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import FormTitleSection from './FormTitleSection';
import FormBodySection from './FormBodySection';
import FormFooterSection from './FormFooterSection';
import SubmissionModal from './SubmissionModal';
import ResultModal from './ResultModal';
import { normalizeData, constructPayload } from './utils';
import './Styles/FormComponent.css';
import { v4 as uuidv4 } from 'uuid';
import { createFormulaire } from '../../Service/Forms';

const FormComponent = ({ formData }) => {
  const [formTitle, setFormTitle] = useState(null);
  const [formFooter, setFormFooter] = useState(null);
  const [bodyItems, setBodyItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [design, setDesign] = useState({
    backgroundColor: '#ffffff',
    productsImages: [],
    logo: null,
    excelFileLink: ''
  });

  useEffect(() => {
    if (formData) {
      if (formData.head) setFormTitle(formData.head.title);
      if (formData.footer) setFormFooter(formData.footer.titre);
      if (formData.body) setBodyItems(normalizeData(formData.body));
    }
  }, [formData]);

  const handleAddBodyItem = (item) => {
    const newItem = {
      id: uuidv4(),
      type: item.type === 'grouped' ? 'socle image' : 'text',
      Titre: '',
      RespenseText: '',
      Required: false
    };
    setBodyItems((prevItems) => [...prevItems, newItem]);
  };

  const handleRemoveBodyItem = (id) => {
    setBodyItems(bodyItems.filter(item => item.id !== id));
  };

  const handleTextFieldChange = (id, newValue, type = 'Titre') => {
    setBodyItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        if (type === 'file') return { ...item, RespenseText: newValue, fileName: newValue?.name };
        if (type === 'Required') return { ...item, Required: newValue };
        return { ...item, [type]: newValue };
      }
      return item;
    }));
  };

  const moveItem = (dragIndex, hoverIndex) => {
    setBodyItems(prevItems => {
      const updatedItems = [...prevItems];
      const draggedItem = updatedItems.splice(dragIndex, 1)[0];
      updatedItems.splice(hoverIndex, 0, draggedItem);
      return updatedItems;
    });
  };

  const handleFormSubmit = async (design) => {
    const payload = constructPayload(formTitle, formFooter, bodyItems, design);
    console.log("Data submission payload: ", payload); // Log the payload directly
    try {
      const response = await createFormulaire(payload);
      console.log('Formulaire created successfully:', response);
      setResult(response);
      setResultModalOpen(true);
      resetForm();
    } catch (error) {
      console.error('Error creating formulaire:', error);
      setResult({ Message: 'Error creating formulaire', formUrl: '' });
      setResultModalOpen(true);
    }
    setModalOpen(false);
  };

  const resetForm = () => {
    setFormTitle(null);
    setFormFooter(null);
    setBodyItems([]);
    setDesign({
      backgroundColor: '#ffffff',
      productsImages: [],
      logo: null,
      excelFileLink: ''
    });
  };

  const openModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);
  const handleCloseResultModal = () => setResultModalOpen(false);

  return (
    <Grid container spacing={3} className="form-container">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom className="empty-message">
          Create a Form
        </Typography>
      </Grid>
      <Grid item xs={12} className="form-title-section">
        <Paper elevation={3} className="paper-container">
          <FormTitleSection formTitle={formTitle} setFormTitle={setFormTitle} />
        </Paper>
      </Grid>
      <Grid item xs={12} className="form-body-section">
        <Paper elevation={3} className="paper-container">
          <FormBodySection
            bodyItems={bodyItems}
            setBodyItems={setBodyItems}
            handleTextFieldChange={handleTextFieldChange}
            handleRemoveBodyItem={handleRemoveBodyItem}
            handleMoveBodyItem={moveItem}
            handleAddBodyItem={handleAddBodyItem}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} className="form-footer-section">
        <Paper elevation={3} className="paper-container">
          <FormFooterSection formFooter={formFooter} setFormFooter={setFormFooter} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={openModal}>
          Submit
        </Button>
      </Grid>
      <SubmissionModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleFormSubmit}
      />
      <ResultModal
        open={resultModalOpen}
        handleClose={handleCloseResultModal}
        result={result}
      />
    </Grid>
  );
};

export default FormComponent;
