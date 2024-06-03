import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormComponent from '../FormComponent';

describe('FormComponent', () => {
  test('renders and submits form', () => {
    // Wrap the component under test with DndProvider
    const { getByText, getByLabelText, queryByText } = render(
      <DndProvider backend={HTML5Backend}>
        <FormComponent />
      </DndProvider>
    );
    // Optional: Fill out form fields if necessary
    // Example: const nameInput = getByLabelText('Name');
    // fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    // Find the submit button and click it
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    // Assuming the form shows a "Form submitted" message upon submission
    // This checks if the message is now present in the document
    // Replace 'Form submitted' with the actual feedback message or use another assertion relevant to your form's feedback mechanism
    const feedbackMessage = queryByText('Form submitted');
    expect(feedbackMessage).toBeInTheDocument(); // This will fail if 'Form submitted' message is not part of your component's output after submission

    // If your component updates its state and does not show a message, you might need to mock function props to check if they've been called, or check for other changes in the DOM.
  });
});
import React, { useRef } from 'react';
import { TextField, IconButton, Grid, Paper } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = { BODY_ITEM: 'bodyItem' };

const BodyItem = ({ item, onChange, onRemove, index, moveItem }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.BODY_ITEM,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex !== hoverIndex) {
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BODY_ITEM,
    item: () => ({ id: item.id, index }),
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  });

  drag(drop(ref));

  return (
    <Paper ref={ref} style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      {item.imageLink ? (
        <>
          <TextField
            variant="outlined"
            style={{ margin: '8px', flexGrow: 1 }}
            placeholder="Enter title here"
            value={item.titre}
            onChange={(e) => onChange(index, { ...item, titre: e.target.value })}
          />
          <TextField
            type="file"
            variant="outlined"
            style={{ margin: '8px' }}
            onChange={(e) => onChange(index, { ...item, file: e.target.files[0], fileName: e.target.files[0]?.name })}
          />
        </>
      ) : (
        <TextField
          variant="outlined"
          fullWidth
          style={{ margin: '8px', flexGrow: 1 }}
          placeholder="Enter text here"
          value={item.titre}
          onChange={(e) => onChange(index, { ...item, titre: e.target.value })}
        />
      )}
      <IconButton onClick={() => onRemove(index)} color="secondary" style={{ margin: '8px' }}>
        <DeleteIcon />
      </IconButton>
      <IconButton ref={drag} style={{ margin: '8px', cursor: 'move' }}>
        <DragIndicatorIcon />
      </IconButton>
    </Paper>
  );
};

export default BodyItem;
