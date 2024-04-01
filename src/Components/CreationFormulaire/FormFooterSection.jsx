// FormFooterSection.jsx
import React from 'react';
import { Typography, Paper } from '@mui/material';
import { useDrop } from 'react-dnd';
import TextFieldDepot from './TextFieldDepot';
import './Styles/FormFooterSectionStyles.css'; // Import the CSS file for footer component

const FormFooterSection = ({ formFooter, setFormFooter }) => {
  const [{ isOver: isFooterOver }, footerDrop] = useDrop(() => ({
    accept: 'FORM_TEXT_FIELD',
    drop: (item) => setFormFooter(item.title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="footer-section-container">
      <Typography variant="h5" className="empty-message">Form Footer</Typography>
      <div  ref={footerDrop}>
        <Paper className="paper-container">
          {formFooter !== null ? (
            <TextFieldDepot
              value={formFooter}
              onChange={setFormFooter}
            />
          ) : (
            <div className="empty-message">Drag a text field here for the footer</div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default FormFooterSection;
