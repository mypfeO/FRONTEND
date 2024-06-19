import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormComponent from './FormComponent';
import { getFormByformIDSiteId, submitForm } from '../../Service/SubmitionForm';
import DepotFieldContainer from './DepotFieldContainer'; // Import the new component
import './Styles/Formulaire.css'; // Import the CSS file for styling
import { useLocation } from 'react-router-dom';
const theme = createTheme();


  // Define the onDrop function to handle dropped items 
  
  const App = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const { siteWebId, formId } = location.state || {};
    const [fetchedData,SetfetchedData]= useState({}); 
    const { formData } = location.state||{};
    const handleDrop = (text) => {
      console.log('Dropped item:', text);
    };
  //   const fetchFormData = async () => {
  //     setLoading(true);
  //     try {
        
  //       console.log("Received data from from:", formData);
  //       const response = await getFormByformIDSiteId('660d430dcd246c7eb48790f9', '6643da19a910d6b593b3789a');
  //       console.log("Received data:", response);
  //       const data = formData;
  //       SetfetchedData({
  //         body: data.body || [],
  //         footer: data.footer || null,
  //         head: data.head || null
  //       });
  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //       setError('Failed to load form data');
  //     } finally {
  //       setLoading(false);
  //     }
  // };
  
  //   useEffect(() => {
  //     fetchFormData();
  //   }, [siteWebId, formId]);
    return (
      <ThemeProvider theme={theme}>
        <div className="app-container">
          <div className="right-component"> {/* This now comes first in the HTML */}
            <DepotFieldContainer onDrop={handleDrop} />
          </div>
          <div className="left-component"> {/* This now comes second in the HTML */}
          <FormComponent formData={formData}siteWebId={siteWebId} formId={formId}/>
          </div>
        </div>
      </ThemeProvider>
    );
  };

export default App;