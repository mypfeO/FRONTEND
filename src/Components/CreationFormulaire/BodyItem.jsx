// src/Components/BodyItem.js

import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IconButton, TextField, Grid, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { encodeFileToBase64 } from './utils';

const ItemTypes = { BODY_ITEM: 'bodyItem' };

const BodyItem = ({ item, onChange, onRemove, index, moveItem }) => {
  const ref = useRef(null);
  const [isRequired, setRequired] = useState(item.required || false);

  const handleRequiredChange = (event) => {
    const newRequiredValue = event.target.checked;
    setRequired(newRequiredValue);
    onChange(item.id, newRequiredValue, 'Required');
  };

  const [, drop] = useDrop({
    accept: ItemTypes.BODY_ITEM,
    hover(draggedItem, monitor) {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
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
        let newType = item.type;
        if (item.type === 'socle image') {
          newType = 'image';
        } else if (item.type === 'socle video') {
          newType = 'video';
        }
        onChange(item.id, base64, 'respenseText');
        onChange(item.id, file.name, 'fileName');
        onChange(item.id, newType, 'type'); // Update the type
      } catch (error) {
        console.error('Error encoding file to Base64:', error);
      }
    }
  };

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" spacing={2}>
        {/* Handling text fields */}
        {item.type === 'text' && (
          <Grid item xs>
            <TextField
              variant="outlined"
              fullWidth
              value={item.titre || ''}
              onChange={(e) => onChange(item.id, e.target.value, 'titre')}
              placeholder="Enter text"
              className="custom-text-field"
            />
          </Grid>
        )}

        {/* Handling image fields */}
        {item.type === 'image' && (
          <>
            <Grid item xs={12} sm={4}>
              {item.respenseText ? (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: '100px', maxHeight: '100px' }}>
                  <img
                    src={item.respenseText}
                    alt="Uploaded Image"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px' }}
                  />
                </Box>
              ) : (
                <Typography variant="body1">{item.fileName || "No image selected"}</Typography> 
              )}
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                fullWidth
                value={item.titre || ''}
                onChange={(e) => onChange(item.id, e.target.value, 'titre')}
                placeholder="Enter description"
                className="custom-text-field"
              />
            </Grid>
            <Grid item xs>
              <IconButton component="label" color="primary">
                {item.isFetched ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </Grid>
          </>
        )}

        {/* Handling video fields */}
        {item.type === 'video' && (
          <>
            <Grid item xs={12} sm={4}>
              {item.respenseText ? (
                <Box display="flex" justifyContent="center" alignItems="center" style={{ maxWidth: '100px', maxHeight: '100px' }}>
                  <video
                    src={item.respenseText}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px' }}
                    controls
                  />
                </Box>
              ) : (
                <Typography variant="body1">{item.fileName || "No video selected"}</Typography> 
              )}
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                fullWidth
                value={item.titre || ''}
                onChange={(e) => onChange(item.id, e.target.value, 'titre')}
                placeholder="Enter description"
                className="custom-text-field"
              />
            </Grid>
            <Grid item xs>
              <IconButton component="label" color="primary">
                {item.isFetched ? "Change Video" : "Upload Video"}
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </Grid>
          </>
        )}

        {/* Handling socle image fields */}
        {item.type === 'socle image' && (
          <>
            <Grid item xs>
              <Typography variant="body1">{item.fileName || "No image selected"}</Typography> 
              <TextField
                variant="outlined"
                fullWidth
                value={item.titre || ''}
                onChange={(e) => onChange(item.id, e.target.value, 'titre')}
                placeholder="Enter description"
                className="custom-text-field"
              />
            </Grid>
            <Grid item xs>
              <IconButton component="label" color="primary">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </Grid>
          </>
        )}

        {/* Handling socle video fields */}
        {item.type === 'socle video' && (
          <>
            <Grid item xs>
              <Typography variant="body1">{item.fileName || "No video selected"}</Typography> 
              <TextField
                variant="outlined"
                fullWidth
                value={item.titre || ''}
                onChange={(e) => onChange(item.id, e.target.value, 'titre')}
                placeholder="Enter description"
                className="custom-text-field"
              />
            </Grid>
            <Grid item xs>
              <IconButton component="label" color="primary">
                Upload Video
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </Grid>
          </>
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
