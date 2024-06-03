// src/Components/DepotFieldContainer.js

import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography, Button } from '@mui/material';
import { useDrag } from 'react-dnd';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  depotContainer: {
    width: '80%',
    maxHeight: '60%',
    background: '#282c34',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px rgba(6, 5, 5, 0.1)',
    overflow: 'hidden',
    padding: '20px',
    margin: 'auto',
    marginTop: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    width: '100%',
    color: '#fff',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderBottom: '2px solid #fff',
    '&::placeholder': {
      color: '#aaa',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
    },
    margin: '10px 0',
  },
  label: {
    color: '#fff',
  }
});

const DepotFieldContainer = ({ onDrop, value = '', onChange }) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState(value);
  const [file, setFile] = useState(null);

  // Drag source for text
  const [, dragText] = useDrag(() => ({
    type: 'FORM_TEXT_FIELD',
    item: { type: 'text', value: inputText },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop({ type: 'text', value: inputText });
      }
    }
  }));

  // Drag source for image files
  const [, dragFileImage] = useDrag(() => ({
    type: 'FORM_FILE_IMAGE',
    item: { type: 'file', file },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult && file) {
        onDrop({ type: 'socle image', value: file });
      }
    }
  }));

  // Drag source for video files
  const [, dragFileVideo] = useDrag(() => ({
    type: 'FORM_FILE_VIDEO',
    item: { type: 'file', file },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult && file) {
        onDrop({ type: 'video socle', value: file });
      }
    }
  }));

  useEffect(() => {
    if (value !== inputText) {
      setInputText(value);
    }
  }, [value]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    onChange(event.target.value);
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      onChange(newFile);
    }
  };

  return (
    <Paper elevation={3} className={classes.depotContainer}>
      <Typography variant="h4" align="center" gutterBottom className="empty-message">
        Depot Field Container
      </Typography>
      <TextField
        className={classes.textField}
        variant="outlined"
        fullWidth
        placeholder="Enter your text here"
        value={inputText}
        onChange={handleInputChange}
        InputProps={{ ref: dragText, className: classes.input }}
        InputLabelProps={{ className: classes.label }}
      />
      <TextField
        className={classes.textField}
        fullWidth
        variant="outlined"
        value={file ? file.name : ''}
        placeholder="No image chosen"
        InputProps={{
          readOnly: true,
          ref: dragFileImage,
          endAdornment: (
            <Button
              component="label"
              style={{ color: '#fff' }}
            >
              Choose Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          ),
        }}
        InputLabelProps={{ className: classes.label }}
      />
      <TextField
        className={classes.textField}
        fullWidth
        variant="outlined"
        value={file ? file.name : ''}
        placeholder="No video chosen"
        InputProps={{
          readOnly: true,
          ref: dragFileVideo,
          endAdornment: (
            <Button
              component="label"
              style={{ color: '#fff' }}
            >
              Choose Video
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          ),
        }}
        InputLabelProps={{ className: classes.label }}
      />
    </Paper>
  );
};

export default DepotFieldContainer;

