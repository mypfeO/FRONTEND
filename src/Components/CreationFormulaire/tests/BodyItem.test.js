import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BodyItem from '../BodyItem';

describe('BodyItem', () => {
  const mockOnChange = jest.fn();
  const mockOnRemove = jest.fn();
  const mockMoveItem = jest.fn();

  const item = { id: '1', type: 'text', text: 'Test Text', required: false };

  it('should render the body item', () => {
    render(
      <BodyItem
        item={item}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        index={0}
        moveItem={mockMoveItem}
      />
    );
    expect(screen.getByDisplayValue('Test Text')).toBeInTheDocument();
  });

  it('should handle text change', () => {
    render(
      <BodyItem
        item={item}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        index={0}
        moveItem={mockMoveItem}
      />
    );
    const input = screen.getByDisplayValue('Test Text');
    fireEvent.change(input, { target: { value: 'Updated Text' } });
    expect(mockOnChange).toHaveBeenCalledWith('1', 'Updated Text', 'text');
  });

  it('should handle removing the item', () => {
    render(
      <BodyItem
        item={item}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        index={0}
        moveItem={mockMoveItem}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });

  it('should handle required checkbox change', () => {
    render(
      <BodyItem
        item={item}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        index={0}
        moveItem={mockMoveItem}
      />
    );
    const checkbox = screen.getByRole('checkbox', { name: /required/i });
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith('1', true, 'required');
  });
});
