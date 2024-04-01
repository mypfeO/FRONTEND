import React from 'react';
import { Typography, Paper } from '@mui/material';
import { useDrop } from 'react-dnd';
import TextFieldDepot from './TextFieldDepot';
import { useDrag } from 'react-dnd'; // Import useDrag hook
import './Styles/FormTitleSectionStyles.css'; // Import the CSS file for title component

const FormTitleSection = ({ formTitle, setFormTitle }) => {
  const [{ isOver: isTitleOver }, titleDrop] = useDrop(() => ({
    accept: 'FORM_TEXT_FIELD',
    drop: (item) => setFormTitle(item.title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Apply the useDrag hook to the TextFieldDepot component
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FORM_TEXT_FIELD',
    item: { title: formTitle }, // Pass the formTitle as the title in the drag item
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="title-section-container"> {/* Apply the custom class for the whole component */}
      <Typography variant="h5" className="empty-message">Form Title</Typography>
      <div style={{ marginBottom: '20px' }}>
        <div ref={titleDrop}>
          <Paper 
            className={`paper-container ${isDragging ? 'dragging' : ''}`} // Add isDragging class conditionally
            ref={drag} // Apply drag to the Paper component
          >
            {formTitle !== null ? (
              <TextFieldDepot
                value={formTitle}
                onChange={setFormTitle}
              />
            ) : (
              <div className="empty-message">Drag a text field here for the title</div>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default FormTitleSection;
