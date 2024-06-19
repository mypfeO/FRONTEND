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
import { createFormulaire, updateFormulaire } from '../../Service/Forms';

const FormComponent = ({ formData, formId, siteWebId }) => {
  const [formTitle, setFormTitle] = useState('');
  const [formFooter, setFormFooter] = useState([]);
  const [bodyItems, setBodyItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [design, setDesign] = useState({
    backgroundColor: '#ffffff',
    productImages: [],
    logo: null,
    excelFileLink: '',
    codeBoard: ''
  });

  useEffect(() => {
    if (formData) {
      if (formData.head) setFormTitle(formData.head.title);
      if (formData.footer) setFormFooter(formData.footer);
      if (formData.body) setBodyItems(normalizeData(formData.body));
      if (formData.design) {
        setDesign({
          backgroundColor: formData.design.backgroundColor || '#ffffff',
          productImages: formData.design.productImages || [],
          logo: formData.design.logo || null,
          excelFileLink: formData.excelFileLink || '',
          codeBoard: formData.codeBoard || ''
        });
      }
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

 
  const handleFormSubmit = async (updatedDesign) => {
    console.log('updatedDesignddddddddd:', updatedDesign);
    const payload = constructPayload(formTitle, formFooter, bodyItems, updatedDesign, siteWebId);
    console.log("Data submission payload: ", payload);

    try {
      let response;

      // Check if formId exists for updating, otherwise create a new form
      if (formId) {
        response = await updateFormulaire(payload, formId);
        console.log('Formulaire updated successfully:', response);
      } else {
        response = await createFormulaire(payload);
        console.log('Formulaire created successfully:', response);
      }
      setResult(response);
      setResultModalOpen(true);
      resetForm();
    } catch (error) {
      console.error('Error creating/updating formulaire:', error);
      setResult({ Message: 'Error creating/updating formulaire', formUrl: '' });
      setResultModalOpen(true);
    }
    setModalOpen(false);
  };


  const resetForm = () => {
    setFormTitle('');
    setFormFooter([]);
    setBodyItems([]);
    setDesign({
      backgroundColor: '#ffffff',
      productImages: [],
      logo: null,
      excelFileLink: '',
      codeBoard: ''
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
          {console.log('Form data:', formData)}
          {formData ? 'Edit Form' : 'Create Form'}
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
          {formData ? 'Update' : 'Submit'}
        </Button>
      </Grid>
      <SubmissionModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleFormSubmit}
        initialDesign={design}
      />
      <ResultModal
        open={resultModalOpen}
        handleClose={handleCloseResultModal}
        result={result}
        siteWebId={siteWebId}
        formId={formId}
      />
    </Grid>
  );
};

export default FormComponent;
