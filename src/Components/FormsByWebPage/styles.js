import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(3),
     background: 'linear-gradient(to right, #8e2de2, #4a00e0)', // Gradient background for the whole page
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 16px 32px 0 rgba(0,0,0,0.2)',
    },
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent', // Makes the text color transparent to show the gradient
    marginBottom: theme.spacing(2),
  },
  header: {
    color: '#fff',
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
    marginBottom: theme.spacing(4),
  },
  button: {
    background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '10px 30px',
    borderRadius: '20px',
    '&:hover': {
      background: 'linear-gradient(to right, #4a00e0, #8e2de2)',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: '1.2rem',
    textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
  },
}));
