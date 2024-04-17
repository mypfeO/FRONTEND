import React, { useEffect, useState } from 'react';
import { getFormByformIDSiteId, submitForm } from '../../Service/SubmitionForm';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import useStyles from './styles';

const FormDataFetcher = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ body: [], footer: {}, head: {} });
  const [submitBody, setSubmitBody] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [excelFileLink, setExcelFileLink] = useState("");

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await getFormByformIDSiteId('660d430dcd246c7eb48790f9', '661cf9017950228549595edc');
      console.log("Received data:", response);
      const data = response.formulaire;
      setFormData({
        body: data.body || [],
        footer: data.footer || {},
        head: data.head || {}
      });
      setExcelFileLink(response.excelFileLink);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to load form data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    const initialSubmitBody = formData.body.map(item => ({
      Titre: item.titre,
      ImageLink: item.imageLink,
      RespenseFile: undefined,
      RespenseText: ''
    }));
    setSubmitBody(initialSubmitBody);
  }, [formData.body]);

  const handleInputChange = (index, value) => {
    const updatedSubmitBody = [...submitBody];
    updatedSubmitBody[index].RespenseText = value;
    setSubmitBody(updatedSubmitBody);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedSubmitBody = [...submitBody];
      updatedSubmitBody[index].RespenseFile = file;
      setSubmitBody(updatedSubmitBody);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!excelFileLink) {
      console.error('Excel file link is undefined.');
      return;
    }

    const submissionData = {
      Body: submitBody,
      ExcelFileLink: excelFileLink,
    };

    console.log('Submission Data:', submissionData);
    await submitForm(submissionData.Body, submissionData.ExcelFileLink);
    alert('Form submitted. Check the console for data.');
  };

  if (loading) {
    return <Box className={classes.center}><CircularProgress /></Box>;
  }
  if (error) {
    return <Typography className={classes.error}>{`Error: ${error}`}</Typography>;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.card}>
        <Typography variant="h4" className={classes.header}>{formData.head.title}</Typography>
        <form onSubmit={handleSubmit}>
          {submitBody.map((item, index) => (
            <Box key={index} className={classes.inputBox}>
              <Typography variant="h6">{item.Titre}</Typography>
              {formData.body[index].champText && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your Response"
                  value={item.RespenseText}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className={classes.input}
                />
              )}
              {item.ImageLink && (
                <input
                  accept=".jpg, .png"
                  type="file"
                  onChange={(e) => handleFileChange(index, e)}
                  className={classes.input}
                />
              )}
            </Box>
          ))}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={classes.submitButton}
          >
            {formData.footer.titre}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default FormDataFetcher;
