import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login'; // Make sure the import path is correct
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a basic theme
const theme = createTheme();

// A helper function to wrap components with ThemeProvider during tests
const renderWithTheme = (ui, { ...options } = {}) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);

describe('Login Component', () => {
  test('renders without crashing', () => {
    renderWithTheme(<Login />);
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
  });

  test('initially shows the login form', () => {
    renderWithTheme(<Login />);
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByText(/Switch to Sign Up/i)).toBeInTheDocument();
  });

  test('toggles to sign up form when button is clicked', () => {
    renderWithTheme(<Login />);
    fireEvent.click(screen.getByText(/Switch to Sign Up/i));
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Switch to Login/i)).toBeInTheDocument();
  });

  test('toggles back to login form when button is clicked again', () => {
    renderWithTheme(<Login />);
    fireEvent.click(screen.getByText(/Switch to Sign Up/i)); // First click to switch to Sign Up
    fireEvent.click(screen.getByText(/Switch to Login/i)); // Second click to switch back to Login
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByText(/Switch to Sign Up/i)).toBeInTheDocument();
  });
});
