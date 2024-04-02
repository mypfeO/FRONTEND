import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextFieldDepot from '../TextFieldDepot'; // Adjust the import path as necessary

describe('TextFieldDepot Component', () => {
  test('renders and handles text change', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <DndProvider backend={HTML5Backend}>
        <TextFieldDepot onChange={mockOnChange} value="initial" />
      </DndProvider>
    );

    const input = getByPlaceholderText('Enter your text here');
    fireEvent.change(input, { target: { value: 'updated' } });

    expect(mockOnChange).toHaveBeenCalledWith('updated');
  });
});

/*
/*
// This example assumes you have setup for mocking react-dnd in your tests
import React from 'react';
import { render } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import FormBodySection from './FormBodySection';

describe('FormBodySection drag-and-drop', () => {
  test('items can be dragged and dropped', () => {
    // Wrap in DndProvider with a test backend for drag-and-drop
    const { getByText } = render(
      <DndProvider backend={TestBackend}>
        <FormBodySection {...props} /> {/* Pass required props }*
       // </DndProvider>
        //);
    
        // Simulate drag and drop using react-dnd test backend
        // You will need to directly interact with the TestBackend
        // This step is highly dependent on how your components and drag-and-drop are implemented
    
       // expect(getByText('Expected result after drag-and-drop')).toBeInTheDocument();
      //});
    //});
   /* 
    import React from 'react';
    import { render, fireEvent } from '@testing-library/react';
    import TextFieldDepot from './TextFieldDepot';
    
    describe('TextFieldDepot onDrop', () => {
      test('calls onDrop when container is clicked', () => {
        const mockOnDrop = jest.fn();
        const { getByText } = render(<TextFieldDepot onDrop={mockOnDrop} title="Drop Here" />);
    
        fireEvent.click(getByText('Drop Here'));
    
        expect(mockOnDrop).toHaveBeenCalled();
      });
    });
    


*/



