import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // A vibrant purple
    },
    secondary: {
      main: '#03dac6', // A bright teal
    },
    error: {
      main: '#b00020', // A strong red
    },
    background: {
      default: '#f4f4f4' // A light grey background
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      fontSize: '2.125rem', // Large title
      fontWeight: 600,
      color: '#6200ea' // Use primary color for titles
    },
    button: {
      textTransform: 'none', // No uppercase
      fontWeight: 600
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          borderBottom: '2px solid #fff',
          '&::placeholder': {
            color: '#aaa',
          },
          '& .MuiInputBase-input': {
            color: '#fff', // Ensures input text color is white
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          borderRadius: '20px',
          fontWeight: 600,
          color: '#fff',
          backgroundColor: '#6200ea', // Uses primary color
          '&:hover': {
            backgroundColor: '#03dac6', // Uses secondary color on hover
          }
        }
      }
    }
  }
});

export default theme;
