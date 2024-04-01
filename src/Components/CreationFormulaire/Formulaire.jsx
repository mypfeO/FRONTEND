import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormComponent from './FormComponent';
import DepotFieldContainer from './DepotFieldContainer'; // Import the new component
import './Styles/Formulaire.css'; // Import the CSS file for styling

const theme = createTheme();

const App = () => {
  // Define the onDrop function to handle dropped items
  const handleDrop = (text) => {
    // Logic to handle dropped items
    console.log('Dropped item:', text);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <div className="left-component">
          <FormComponent />
        </div>
        <div className="right-component">
          <DepotFieldContainer onDrop={handleDrop} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
