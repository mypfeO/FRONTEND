import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useDrag } from 'react-dnd';
import DepotContainer from './Styles/TextFieldDepotStyles'; // Import the styles

const TextFieldDepot = ({ onDrop, id, value = '', onChange, title }) => {
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
    <DepotContainer 
      elevation={3} 
      className={`${isDragging ? 'dragging' : ''}`}
      onClick={handleDrop}
    >
      <TextField 
        variant="outlined" 
        fullWidth 
        placeholder="Enter your text here"
        value={inputText}
        onChange={handleInputChange}
        inputRef={drag} // Apply drag to the text field
        InputProps={{
          style: {
            color: '#fff', // Text color
            borderRadius: '5px', // Rounded corners
          },
          placeholder: "Enter your text here",
        }}
      />
    </DepotContainer>
  );
};

export default TextFieldDepot;
