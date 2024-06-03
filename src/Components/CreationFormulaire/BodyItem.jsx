// src/Components/BodyItem.js

import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IconButton, TextField, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { encodeFileToBase64 } from './utils';

const ItemTypes = { BODY_ITEM: 'bodyItem' };

const BodyItem = ({ item, onChange, onRemove, index, moveItem }) => {
  const ref = useRef(null);
  const [isRequired, setRequired] = useState(item.Required || false);

  const handleRequiredChange = (event) => {
    const newRequiredValue = event.target.checked;
    setRequired(newRequiredValue);
    onChange(item.id, newRequiredValue, 'Required');
  };

  const [, drop] = useDrop({
    accept: ItemTypes.BODY_ITEM,
    hover(draggedItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BODY_ITEM,
    item: () => ({
      id: item.id,
      index
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await encodeFileToBase64(file);
        onChange(item.id, base64, 'RespenseText');
        onChange(item.id, file.name, 'fileName');
        onChange(item.id, item.type === 'socle image' ? 'image' : 'video', 'type');
      } catch (error) {
        console.error('Error encoding file to Base64:', error);
      }
    }
  };

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" spacing={2}>
        {(item.type === 'socle image' || item.type === 'socle video' || item.type === 'image' || item.type === 'video') ? (
          <>
            <Grid item xs>
              <TextField
                variant="outlined"
                fullWidth
                value={item.Titre || ''}
                onChange={(e) => onChange(item.id, e.target.value, 'Titre')}
                placeholder="Enter description"
                className="custom-text-field"
              />
            </Grid>
            <Grid item xs>
              <Typography className="custom-typography">{item.fileName || `No ${item.type === 'socle image' || item.type === 'image' ? 'image' : 'video'} selected`}</Typography>
            </Grid>
            <Grid item xs>
              <IconButton component="label" color="primary">
                {item.type === 'socle image' || item.type === 'image' ? 'Change Image' : 'Change Video'}
                <input
                  type="file"
                  accept={item.type === 'socle image' || item.type === 'image' ? 'image/*' : 'video/*'}
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </Grid>
          </>
        ) : (
          <Grid item xs>
            <TextField
              variant="outlined"
              fullWidth
              value={item.Titre || ''}
              onChange={(e) => onChange(item.id, e.target.value, 'Titre')}
              className="custom-text-field"
            />
          </Grid>
        )}
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isRequired}
                onChange={handleRequiredChange}
                color="primary"
              />
            }
            label="Required"
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => onRemove(item.id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton style={{ cursor: 'move' }} ref={drag}>
            <DragIndicatorIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default BodyItem;
