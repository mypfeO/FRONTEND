// FormBodySection.jsx
import React from 'react';
import { Typography, Paper } from '@mui/material';
import { useDrop } from 'react-dnd';
import BodyItem from './BodyItem';
import './Styles/FormBodySectionStyles.css'; // Import the CSS file for body section

const FormBodySection = ({
  bodyItems,
  handleTextFieldChange,
  handleRemoveBodyItem,
  handleMoveBodyItem,
  handleAddBodyItem
}) => {
  const [, bodyDrop] = useDrop(() => ({
    accept: 'FORM_TEXT_FIELD',
    drop: (item) => handleAddBodyItem(item.title),
  }));

  return (
    <>
      <Typography  className="empty-message" variant="h5">Form Body</Typography>
      <div className="form-body-container" ref={bodyDrop}>
        <Paper className="paper-container">
          {bodyItems.length === 0 ? (
            <div className="empty-message">Drop elements here</div>
          ) : (
            bodyItems.map((item, index) => (
              <BodyItem
                key={item.id}
                index={index}
                id={item.id}
                title={item.title}
                onChange={(text) => handleTextFieldChange(item.id, text)}
                onRemove={() => handleRemoveBodyItem(item.id)}
                moveItem={handleMoveBodyItem}
              />
            ))
          )}
        </Paper>
      </div>
    </>
  );
};

export default FormBodySection;
