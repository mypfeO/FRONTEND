import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormsBySiteWebId } from '../../Service/Forms';
import { Typography, Box, CircularProgress, Card, CardContent, Grid, Button } from '@mui/material';
import useStyles from './styles'; 

const FormList = () => {
  const classes = useStyles();
  const { siteWebId } = useParams();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const fetchedForms = await getFormsBySiteWebId(siteWebId);
        setForms(fetchedForms);
      } catch (error) {
        console.error('Error fetching forms:', error);
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [siteWebId]);

  const handleCreateForm = () => {
    navigate('/formulaire', { state: { siteWebId } });
  };

  const handleBackToPages = () => {
    navigate('/pages');  // Update path to navigate to PageList
  };

  if (loading) return <Box className={classes.center}><CircularProgress /></Box>;
  if (error) return <Typography className={classes.error}>{error}</Typography>;
  const handlePreviewForm = (siteWebId, formId) => {
    navigate(`/preview-form/${siteWebId}/${formId}`);
  };
  const onchangehandler=(e)=>{
    console.log(e.target.value);  
  }
  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={handleBackToPages}
        >
          Back to Your Pages Web
        </Button>
        <Typography variant="h4" className={classes.header}>
          Your Forms
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={handleCreateForm}
        >
          Create Form
        </Button>
      </Box>
      {forms.length === 0 ? (
        <Box className={classes.noForms}>
          <Typography variant="h5" className={classes.noFormsText}>
            This page web has no forms.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {forms.map((form, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Box className={classes.logoContainer}>
                  {form.design.logo && (
                    <img
                      src={form.design.logo}
                      alt="Form Logo"
                      className={classes.logo}
                    />
                  )}
                </Box>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" className={classes.cardTitle}>
                    {form.formulaire.head.title}
                  </Typography>
                 
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    className={classes.editButton}
                    onClick={() => handlePreviewForm(siteWebId, form._id)}
                    >
                    Preview Form
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FormList;
