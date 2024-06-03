import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormBodySection from '../FormBodySection';

describe('FormBodySection', () => {
  const mockHandleTextFieldChange = jest.fn();
  const mockHandleRemoveBodyItem = jest.fn();
  const mockHandleMoveBodyItem = jest.fn();
  const mockSetBodyItems = jest.fn();

  const bodyItems = [
    { id: '1', type: 'text', content: 'Test Content', champstext: true, imagelink: false }
  ];

  it('should render the body section', () => {
    render(
      <FormBodySection
        bodyItems={bodyItems}
        setBodyItems={mockSetBodyItems}
        handleTextFieldChange={mockHandleTextFieldChange}
        handleRemoveBodyItem={mockHandleRemoveBodyItem}
        handleMoveBodyItem={mockHandleMoveBodyItem}
      />
    );
    expect(screen.getByText('Form Body')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
  });

  it('should handle item change', () => {
    render(
      <FormBodySection
        bodyItems={bodyItems}
        setBodyItems={mockSetBodyItems}
        handleTextFieldChange={mockHandleTextFieldChange}
        handleRemoveBodyItem={mockHandleRemoveBodyItem}
        handleMoveBodyItem={mockHandleMoveBodyItem}
      />
    );
    const input = screen.getByDisplayValue('Test Content');
    fireEvent.change(input, { target: { value: 'Updated Content' } });
    expect(mockHandleTextFieldChange).toHaveBeenCalledWith('1', 'Updated Content', 'text');
  });

  it('should handle removing an item', () => {
    render(
      <FormBodySection
        bodyItems={bodyItems}
        setBodyItems={mockSetBodyItems}
        handleTextFieldChange={mockHandleTextFieldChange}
        handleRemoveBodyItem={mockHandleRemoveBodyItem}
        handleMoveBodyItem={mockHandleMoveBodyItem}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockHandleRemoveBodyItem).toHaveBeenCalledWith('1');
  });

  it('should handle dropping an item', () => {
    render(
      <FormBodySection
        bodyItems={bodyItems}
        setBodyItems={mockSetBodyItems}
        handleTextFieldChange={mockHandleTextFieldChange}
        handleRemoveBodyItem={mockHandleRemoveBodyItem}
        handleMoveBodyItem={mockHandleMoveBodyItem}
      />
    );
    const dropArea = screen.getByText('Form Body').closest('div');
    fireEvent.drop(dropArea);
    expect(mockSetBodyItems).toHaveBeenCalled();
  });
});
