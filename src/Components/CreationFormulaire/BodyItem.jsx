import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IconButton, TextField, Grid } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemTypes = {
  BODY_ITEM: 'bodyItem',
};

const BodyItem = ({ id, title, onChange, onRemove, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BODY_ITEM,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.BODY_ITEM,
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
        
      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const dragRef = React.useRef(null);
  drag(drop(dragRef));

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '10px' }}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => onChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={onRemove} style={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton style={{ cursor: 'move', color: 'blue' }}>
            <DragIndicatorIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default BodyItem;
