import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '0',
  },
  card: {
    width: '60%',
    minHeight: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#282c34',
    color: '#fff',
    borderRadius: '25px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    margin: '40px 0',
    fontSize: '2.5rem',
  },
  inputBox: {
    width: '100%',
    margin: '30px 0',
  },
  input: {
    width: '100%',
    padding: '12px',
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.1)',
    borderBottom: '2px solid #fff',
    '&::placeholder': {
      color: '#aaa',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
    },
  },
  imageInput: { // Custom style for image input fields
    width: '80%', // Custom width for image inputs
    margin: '0 auto', // Centering the input field
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.05)', // Slightly different background to distinguish
    '&::file-selector-button': { // Style for the file selector button if necessary
      padding: '10px',
      backgroundColor: '#666',
      color: '#fff',
      borderRadius: '5px',
      margin: '5px',
      cursor: 'pointer',
    }
  },
  submitButton: {
    width: '100%',
    padding: '16px 0',
    margin: '40px 0',
    fontSize: '1.25rem',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#43a047',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: '20px',
    color: 'red',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    marginTop: '30px',
  },
}));
