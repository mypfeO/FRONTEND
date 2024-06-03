// components/FormList.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormsBySiteWebId } from '../../Service/Forms';
import { Typography, Box, CircularProgress, Card, CardContent, Button } from '@mui/material';
import useStyles from './styles';  // Use the same styling approach or adjust as needed
import { useNavigate } from 'react-router-dom';
const FormList = () => {
  const classes = useStyles();
  const { siteWebId } = useParams();  // This will get the siteWebId from the URL
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleEditClick = (formId, siteWebId) => {
    navigate('/formulaire', { state: { formId, siteWebId } });
  };
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const fetchedForms = await getFormsBySiteWebId(siteWebId);
        console.log("sitewebid: ", siteWebId);
        setForms(fetchedForms);
        console.log("forms: ", fetchedForms);
      } catch (error) {
        console.error('Error fetching forms:', error);
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [siteWebId]);

  if (loading) return <Box className={classes.center}><CircularProgress /></Box>;
  if (error) return <Typography className={classes.error}>{error}</Typography>;

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.header}>Forms for {siteWebId}</Typography>
      {forms.map((form, index) => (
        <Card key={index} className={classes.card}>
          <CardContent>
            <Typography variant="h5" className={classes.cardTitle}>{form.formulaire.head.title}</Typography>
            {/* You can add more details here */}
            <Button onClick={() => handleEditClick(form.formulaire.id, siteWebId)}>Edit</Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FormList;
