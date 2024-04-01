import React, { useState, useEffect } from 'react';
import { TextField, Paper } from '@mui/material';
import { useDrag } from 'react-dnd';
import './Styles/TextFieldDepotStyles.css'; // Importer le style CSS

const DepotFieldContainer = ({ onDrop, value = '', onChange }) => {
  const [inputText, setInputText] = useState(value);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FORM_TEXT_FIELD',
    item: { title: inputText },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  useEffect(() => {
    if (value !== inputText) {
      setInputText(value);
    }
  }, [value]);

  const handleInputChange = (event) => {
    const textValue = event.target.value;
    setInputText(textValue);
    onChange(textValue);
  };

  const handleDrop = () => {
    onDrop(inputText);
    setInputText('');
  };

  return (
    <Paper
      elevation={3}
      className={`depot-container ${isDragging ? 'dragging' : ''}`}
      ref={drag}
      onClick={handleDrop}
    >
      <h2 variant="h6" align="center" gutterBottom className="empty-message">Depot Field Container</h2>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Enter your text here"
        value={inputText}
        onChange={handleInputChange}
        InputProps={{
          style: {
            color: '#fff', // Text color
            borderRadius: '5px', // Rounded corners
          },
          placeholder: "Enter your text here",
        }}
        InputLabelProps={{
          style: {
            color: '#fff', // Label color
          },
        }}
      />
    </Paper>
  );
};

export default DepotFieldContainer;
