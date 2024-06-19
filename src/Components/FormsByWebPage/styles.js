import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  header: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  card: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    width: '100%',
    maxWidth: '360px',
    height: '380px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 auto',
  },
  cardContent: {
    padding: theme.spacing(2),
    flex: '1 0 auto',
  },
  cardTitle: {
    fontWeight: 'bold',
    margin: theme.spacing(1, 0),
    color: '#00695c',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '180px',
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
  },
  logo: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  editButton: {
    borderColor: '#007bff',
    color: '#007bff',
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  button: {
    color: '#fff',
  },
  noForms: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    gap: theme.spacing(2),
  },
  noFormsText: {
    color: '#ff1744',
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export default useStyles;
