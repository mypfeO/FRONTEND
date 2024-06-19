import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { getFormByformIDSiteId } from '../../Service/SubmitionForm';
import { Typography, Box, CircularProgress, Select, MenuItem, TextField, Card, CardContent, Button, Link } from '@mui/material';
import useStyles from './styles';

const PreviewForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { siteWebId, formId } = useParams();
  const [formData, setFormData] = useState({ body: [], footer: [], head: {}, design: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('web');
  const [responses, setResponses] = useState({});
  const [theform, settheform] = useState({});

  useEffect(() => {
    fetchFormData();
  }, [siteWebId, formId]);
  const handleUpdateForm = () => {
    navigate('/formulaire', { state: { siteWebId, formId, formData } });
  };
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
        excelFileLink: response.excelFileLink,
        codeBoard: response.codeBoard,
      });
    } catch (error) {
      setError('Failed to load form data');
    } finally {
      setLoading(false);
    }
  };
  const handleBackToForms = () => {
    navigate(`/forms/${siteWebId}`); // Adjust the path as needed to match your forms list route
  };
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleInputChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const isMobileOrTabletView = view === 'mobile' || view === 'tablet';

  if (loading) return <Box className={classes.center}><CircularProgress /></Box>;
  if (error) return <Typography className={classes.error}>{`Error: ${error}`}</Typography>;

  const viewStyles = {
    web: { width: '100%', height: 'auto' },
    tablet: { width: '90%', height: 'auto' },
    mobile: {
      width: '375px',
      height: 'auto',
      overflowY: 'auto',
      padding: '10px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.header}>Preview Form</Typography>
        <Box className={classes.headerActions}>
        <Select 
   
   value={view}
   onChange={handleViewChange}
   className={classes.viewSelect}
   inputProps={{ className: classes.selectInput }}
   MenuProps={{
     classes: { paper: classes.menuPaper } // Apply custom class to the menu paper
   }}
 >
   <MenuItem value="web" className={classes.menuItem}      style={{ backgroundColor: 'gray', width: '150px' }}>Web View</MenuItem>
   <MenuItem value="tablet" className={classes.menuItem}     style={{ backgroundColor: 'gray', width: '150px' }}>Tablet View</MenuItem>
   <MenuItem value="mobile" className={classes.menuItem}     style={{ backgroundColor: 'gray', width: '150px' }}>Mobile View</MenuItem>
 </Select>
          <Button
            variant="contained"
            color="primary"
            className={classes.updateButton}
            onClick={handleUpdateForm}
          >
            Update Form
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.backButton} // Add CSS class for styling if needed
            onClick={handleBackToForms}
            style={{ marginLeft: '10px' }}
          >
            Back to Forms
          </Button>
        </Box>
      
      </Box>
      <Box
        className={isMobileOrTabletView ? classes.mobileScrollContainer : classes.previewContainer}
        style={{
          ...viewStyles[view],
          backgroundColor: formData.design.backgroundColor || '#ffffff'
        }}
      >
        {formData.design?.logo && (
          <img src={formData.design.logo} alt="Logo" className={isMobileOrTabletView ? classes.mobileLogo : classes.logo} />
        )}
        {formData.design?.productImages && formData.design.productImages.length > 0 && (
          <Box className={isMobileOrTabletView ? classes.mobileProductImageContainer : classes.productImageContainer}>
            {formData.design.productImages.map((image, idx) => (
              <img key={idx} src={image} alt={`Product ${idx}`} className={classes.productImage} />
            ))}
          </Box>
        )}
        <Typography variant="h5" className={classes.formTitle}>{formData.head.title}</Typography>
        {formData.body.map((item, index) => (
          <Card key={index} className={classes.inputCard}>
            <CardContent>
              <Typography variant="h6" className={classes.inputTitle}>{item.titre}</Typography>
              {item.type === 'text' && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your Response"
                  value={responses[index] || item.respenseText}
                  className={isMobileOrTabletView ? classes.mobileInput : classes.input}
                  InputProps={{ style: { color: '#4A90E2', backgroundColor: '#ffffff', borderColor: '#ddd' } }}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              )}
              {item.type === 'video' && (
                <Box className={isMobileOrTabletView ? classes.mobileMediaContainer : classes.mediaContainer}>
                  <video controls className={isMobileOrTabletView ? classes.mobileMedia : classes.media}>
                    <source src={item.respenseText} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              )}
              {item.type === 'image' && (
                <Box className={isMobileOrTabletView ? classes.mobileMediaContainer : classes.mediaContainer}>
                  <img
                    src={item.respenseText}
                    alt={item.titre}
                    className={isMobileOrTabletView ? classes.mobileMedia : classes.media}
                  />
                </Box>
              )}
              {item.type === 'socle video' && (
                <Box className={isMobileOrTabletView ? classes.mobileMediaContainer : classes.mediaContainer}>
                  <input
                    type="file"
                    accept="video/*"
                    className={classes.fileInput}
                    placeholder="Upload Video"
                  />
                </Box>
              )}
              {item.type === 'socle image' && (
                <Box className={isMobileOrTabletView ? classes.mobileMediaContainer : classes.mediaContainer}>
                  <input
                    type="file"
                    accept="image/*"
                    className={classes.fileInput}
                    placeholder="Upload Image"
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
        <Button
          fullWidth
          variant="contained"
          className={classes.submitButton}
        >
          Submit
        </Button>
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
    </Box>
  );
};

export default PreviewForm;