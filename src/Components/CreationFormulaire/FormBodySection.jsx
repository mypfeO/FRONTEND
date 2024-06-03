// src/Components/FormBodySection.js

import React from 'react';
import { Typography, Paper } from '@mui/material';
import { useDrop } from 'react-dnd';
import BodyItem from './BodyItem';
import './Styles/FormBodySectionStyles.css';
import { v4 as uuidv4 } from 'uuid';

const FormBodySection = ({
  bodyItems,
  setBodyItems,
  handleTextFieldChange,
  handleRemoveBodyItem,
  handleMoveBodyItem,
  handleAddBodyItem,
}) => {
  const [{ isOver }, bodyDrop] = useDrop({
    accept: ['FORM_TEXT_FIELD', 'FORM_FILE_IMAGE', 'FORM_FILE_VIDEO'],
    drop: (item, monitor) => {
      const id = uuidv4();
      const newItem = monitor.getItemType() === 'FORM_FILE_IMAGE' ? {
        id,
        type: 'socle image',
        Titre: '',
        RespenseText: '',
        fileName: '',
        Required: false,
      } : monitor.getItemType() === 'FORM_FILE_VIDEO' ? {
        id,
        type: 'socle video',
        Titre: '',
        RespenseText: '',
        fileName: '',
        Required: false,
      } : {
        id,
        type: 'text',
        Titre: '',
        RespenseText: '',
        Required: false,
      };
      setBodyItems((prevItems) => [...prevItems, newItem]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleItemChange = (id, value, type) => {
    setBodyItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [type]: value } : item
      )
    );
  };

  return (
    <>
      <Typography className="empty-message" variant="h5">
        Form Body
      </Typography>
      <div className="form-body-container" ref={bodyDrop}>
        <Paper className={`paper-container ${isOver ? 'hover' : ''}`}>
          {bodyItems.length === 0 ? (
            <div className="empty-message">Drop elements here</div>
          ) : (
            bodyItems.map((item, index) => (
              <BodyItem
                key={item.id || index}
                index={index}
                item={item}
                onChange={handleItemChange}
                onRemove={handleRemoveBodyItem}
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
