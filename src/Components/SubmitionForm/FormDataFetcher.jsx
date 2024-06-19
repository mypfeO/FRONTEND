import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getFormByformIDSiteId, submitForm } from '../../Service/SubmitionForm';
import { Button, TextField, Typography, Box, CircularProgress, Card, CardContent, Link, IconButton } from '@mui/material';
import useStyles from './styles';
import ReactGA from 'react-ga4';
import { encodeFileToBase64 } from '../CreationFormulaire/utils';
import DeleteIcon from '@mui/icons-material/Delete';

const FormDataFetcher = () => {
  const classes = useStyles();
  const { siteWebId, formId } = useParams();
  const [formData, setFormData] = useState({ body: [], footer: [], head: {}, design: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [excelFileLink, setExcelFileLink] = useState("");
  const [responses, setResponses] = useState({});
  const [fileResponses, setFileResponses] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState({}); // State to store comments
  const commentInputRefs = useRef({});

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
    fetchFormData();
  }, [siteWebId, formId]);

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await getFormByformIDSiteId(siteWebId, formId);
      const data = response.formulaire;
      setFormData({
        body: data.body || [],
        footer: data.footer || [],
        head: data.head || {},
        design: response.design || {},
      });
      setExcelFileLink(response.excelFileLink);
    } catch (error) {
      setError('Failed to load form data');
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
    if (formData.design && formData.design.productImages) {
      const timer = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % formData.design.productImages.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [formData.design]);

  const handleInputChange = (index, value) => {
    setResponses(prev => ({ ...prev, [index]: value }));
    ReactGA.event({
      category: 'Form Interaction',
      action: 'Text Input Change',
      label: `Input field at index ${index}`
    });
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      encodeFileToBase64(file).then((base64) => {
        setFileResponses(prev => ({ ...prev, [index]: base64 }));
        ReactGA.event({
          category: 'Form Interaction',
          action: 'File Upload',
          label: `File uploaded at index ${index}`
        });
      }).catch(error => {
        console.error('Error encoding file to base64:', error);
        alert('Failed to upload file. Please try again.');
      });
    } else {
      alert("Please upload a valid file.");
    }
  };

  const handleAddComment = (index, comment) => {
    if (comment.trim()) {
      setComments(prev => ({ ...prev, [index]: [...(prev[index] || []), { user: 'Anonymous', text: comment }] }));
      // Clear input without scrolling down
      commentInputRefs.current[index].value = '';
    }
  };

  const handleDeleteComment = (index, commentIndex) => {
    setComments(prev => ({
      ...prev,
      [index]: prev[index].filter((_, i) => i !== commentIndex)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!excelFileLink) {
      console.error('Excel file link is undefined.');
      return;
    }

    const submissionBody = formData.body.map((item, index) => ({
      titre: item.titre,
      type: item.type,
      respenseBase64: item.type === 'socle image' || item.type === 'socle video' ? fileResponses[index] || '' : '',
      respenseText: item.type === 'text' ? responses[index] || '' : ''
    }));

    const submissionData = {
      body: submissionBody,
      excelFileLink: excelFileLink,
    };

    console.log('Submission Data:', submissionData);
    await submitForm(submissionData.body, submissionData.excelFileLink);
    ReactGA.event({
      category: 'Form Interaction',
      action: 'Form Submit',
      label: 'Form submitted successfully'
    });

    alert('Form submitted. Check the console for data.');
  };

  const handleImageError = (index) => {
    ReactGA.event({
      category: 'Error',
      action: 'Image Load Error',
      label: `Image failed to load at index ${index}`
    });
  };

  return (
    <Box className={classes.root}>

      <Box className={classes.card} style={{ backgroundColor: formData.design.backgroundColor || '#ffffff' }}>
        {formData.design?.logo && (
          <img src={formData.design.logo} alt="Logo" className={classes.logoInCard} />
        )}
        {formData.design?.productImages && formData.design.productImages.length > 0 && (
          <Box className={classes.productImageContainerInCard}>
            <img
              src={formData.design.productImages[currentImageIndex]}
              alt="Product"
              className={classes.productImage}
              onError={() => handleImageError(currentImageIndex)}
            />
          </Box>
        )}
        <Typography variant="h4" className={classes.formTitle}>{formData.head.title}</Typography>
        <form onSubmit={handleSubmit}>
          {formData.body.map((item, index) => (
            <Card key={index} className={classes.inputCard} style={{ backgroundColor: formData.design?.backgroundColor || '#f9f9f9' }}>
              <CardContent>
                <Typography variant="h6" className={classes.inputTitle}>{item.titre}</Typography>
                {item.type === 'text' && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Your Response"
                    value={responses[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className={classes.input}
                  />
                )}
                {item.type === 'video' && (
                  <Box className={classes.mediaContainer}>
                    <video controls className={classes.media}>
                      <source src={responses[index] || item.respenseText} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}
                {item.type === 'image' && (
                  <Box className={classes.mediaContainer}>
                    <img
                      src={responses[index] || item.respenseText}
                      alt={item.titre}
                      className={classes.media}
                      onError={() => handleImageError(index)}
                    />
                  </Box>
                )}
                {(item.type === 'socle video' || item.type === 'socle image') && (
                  <Box className={classes.fileInputContainer}>
                    <input
                      accept={item.type === 'socle video' ? 'video/*' : 'image/*'}
                      type="file"
                      onChange={(e) => handleFileChange(index, e)}
                      className={classes.fileInput}
                    />
                  </Box>
                )}
                {/* Comments Section for each form element */}
                
           </CardContent>
            </Card>
          ))}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
        <Box className={classes.footerLinksContainer}>
          {formData.footer.map((item, index) => (
            <Link
              key={index}
              href={item.linkNextForm}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.footerLink}
            >
              {item.titre}
            </Link>
          ))}
        </Box>
      </Box>
      <Box className={classes.headerContainer}>
        {/* Comment Section */}
        <Box className={classes.commentSection}>
          <Typography variant="h5" className={classes.commentHeader}>Comments</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment"
            className={classes.commentInput}
            inputRef={(el) => commentInputRefs.current['global'] = el}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddComment('global', e.target.value);
              }
            }}
          />
          {comments['global'] && comments['global'].map((comment, i) => (
            <Box key={i} className={classes.comment}>
              <Typography variant="body2" className={classes.commentUser}>{comment.user}:</Typography>
              <Typography variant="body2" className={classes.commentText}>{comment.text}</Typography>
              <IconButton size="small" onClick={() => handleDeleteComment('global', i)} className={classes.deleteButton}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FormDataFetcher;

