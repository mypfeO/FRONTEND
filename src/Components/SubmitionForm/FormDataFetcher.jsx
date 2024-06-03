// FormDataFetcher.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormByformIDSiteId, submitForm } from '../../Service/SubmitionForm';
import { Button, TextField, Typography, Box, CircularProgress, Card, CardContent } from '@mui/material';
import useStyles from './styles';
import ReactGA from 'react-ga';

const FormDataFetcher = () => {
  const classes = useStyles();
  const { siteWebId, formId } = useParams(); // Get siteWebId and formId from URL
  const [formData, setFormData] = useState({ body: [], footer: {}, head: {}, design: {} });
  const [submitBody, setSubmitBody] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [excelFileLink, setExcelFileLink] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Track page view
    ReactGA.pageview(window.location.pathname + window.location.search);

    fetchFormData();
  }, [siteWebId, formId]); // Re-fetch form data if siteWebId or formId changes

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await getFormByformIDSiteId(siteWebId, formId);
      console.log("Received data:", response);
      const data = response.formulaire;
      setFormData({
        body: data.body || [],
        footer: data.footer || {},
        head: data.head || {},
        design: response.design || {}
      });
      setExcelFileLink(response.excelFileLink);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to load form data');

      // Track error event
      ReactGA.event({
        category: 'Error',
        action: 'Fetch Form Data',
        label: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialSubmitBody = formData.body.map(item => ({
      Titre: item.titre,
      ImageLink: item.imageLink,
      RespenseFile: undefined,
      RespenseText: ''
    }));
    setSubmitBody(initialSubmitBody);
  }, [formData.body]);

  useEffect(() => {
    if (formData.design && formData.design.productImages) {
      const timer = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % formData.design.productImages.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(timer);
    }
  }, [formData.design]);

  const handleInputChange = (index, value) => {
    const updatedSubmitBody = [...submitBody];
    updatedSubmitBody[index].RespenseText = value;
    setSubmitBody(updatedSubmitBody);

    // Track input change event
    ReactGA.event({
      category: 'Form Interaction',
      action: 'Text Input Change',
      label: `Input field at index ${index}`
    });
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedSubmitBody = [...submitBody];
      updatedSubmitBody[index].RespenseFile = file;
      setSubmitBody(updatedSubmitBody);

      // Track file upload event
      ReactGA.event({
        category: 'Form Interaction',
        action: 'File Upload',
        label: `File uploaded at index ${index}`
      });
    } else {
      alert("Please upload a valid file.");
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

    // Track form submission event
    ReactGA.event({
      category: 'Form Interaction',
      action: 'Form Submit',
      label: 'Form submitted successfully'
    });

    alert('Form submitted. Check the console for data.');
  };

  if (loading) {
    return <Box className={classes.center}><CircularProgress /></Box>;
  }
  if (error) {
    return <Typography className={classes.error}>{`Error: ${error}`}</Typography>;
  }

  return (
    <Box className={classes.root} style={{ backgroundColor: formData.design?.backgroundColor }}>
      <Box className={classes.headerContainer}>
        {formData.design?.logo && (
          <img src={formData.design.logo} alt="Logo" className={classes.logo} />
        )}
        <Typography variant="h4" className={classes.header}>{formData.head.title}</Typography>
      </Box>
      {formData.design?.productImages && formData.design.productImages.length > 0 && (
        <Box className={classes.productImageContainer}>
          <img
            src={formData.design.productImages[currentImageIndex]}
            alt="Product"
            className={classes.productImage}
          />
        </Box>
      )}
      <Box className={classes.card}>
        <form onSubmit={handleSubmit}>
          {submitBody.map((item, index) => (
            <Card key={index} className={classes.inputCard}>
              <CardContent>
                <Typography variant="h6" className={classes.inputTitle}>{item.Titre}</Typography>
                {formData.body[index].type === 'text' && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Your Response"
                    value={item.RespenseText}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className={classes.input}
                  />
                )}
                {formData.body[index].type === 'video' && (
                  <Box className={classes.mediaContainer}>
                    <video controls className={classes.media}>
                      <source src={formData.body[index].respenseText} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}
                {formData.body[index].type === 'image' && (
                  <Box className={classes.mediaContainer}>
                    <img src={formData.body[index].respenseText} alt={item.Titre} className={classes.media} />
                  </Box>
                )}
                {formData.body[index].type === 'socle video' && (
                  <Box className={classes.fileInputContainer}>
                    <input
                      accept="video/*"
                      type="file"
                      onChange={(e) => handleFileChange(index, e)}
                      className={classes.fileInput}
                    />
                  </Box>
                )}
                {formData.body[index].type === 'socle image' && (
                  <Box className={classes.fileInputContainer}>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleFileChange(index, e)}
                      className={classes.fileInput}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
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
