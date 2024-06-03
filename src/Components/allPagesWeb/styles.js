import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(3),
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    flex: 1,
    color: '#c892c0de', // Color for the name
  },
  cardTheme: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ffffffde', // Color for the theme
    textAlign: 'right',
    flex: 1,
  },
  header: {
    color: '#fff',
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
  },
  button: {
    background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '10px 20px',
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
  },
}));
