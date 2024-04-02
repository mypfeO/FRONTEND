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
