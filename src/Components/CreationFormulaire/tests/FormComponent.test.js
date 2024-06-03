import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormComponent from '../FormComponent';
import { createFormulaire } from '../../../Service/Forms';
import { v4 as uuidv4 } from 'uuid';

// Mocking the createFormulaire service and UUID generation
jest.mock('../../../Service/Forms');
jest.mock('uuid', () => ({ v4: jest.fn(() => 'mock-uuid') }));

describe('FormComponent', () => {
  const mockFormData = {
    head: { title: 'Test Form' },
    body: [],
    footer: { titre: 'Test Footer' }
  };

  it('should render the form with title, body, and footer sections', () => {
    render(<FormComponent formData={mockFormData} />);
    expect(screen.getByText('Create a Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter title')).toBeInTheDocument();
    expect(screen.getByText('Form Body')).toBeInTheDocument();
    expect(screen.getByText('Form Footer')).toBeInTheDocument();
  });

  it('should allow adding a text body item', () => {
    render(<FormComponent formData={mockFormData} />);
    const textInput = screen.getByPlaceholderText('Enter text here');
    fireEvent.change(textInput, { target: { value: 'New Body Text' } });
    expect(textInput.value).toBe('New Body Text');
  });

  it('should handle form submission', async () => {
    createFormulaire.mockResolvedValue({ message: 'Form created successfully', formUrl: 'http://example.com' });
    render(<FormComponent formData={mockFormData} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('Form created successfully')).toBeInTheDocument();
  });

  it('should reset the form after submission', async () => {
    createFormulaire.mockResolvedValue({ message: 'Form created successfully', formUrl: 'http://example.com' });
    render(<FormComponent formData={mockFormData} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('Form created successfully')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter title').value).toBe('');
  });
});
