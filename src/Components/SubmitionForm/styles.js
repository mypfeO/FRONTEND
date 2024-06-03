import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    maxHeight: '100px',
    marginRight: '20px',
  },
  header: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#333',
  },
  productImageContainer: {
    width: '200px',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  card: {
    width: '80%',
    minHeight: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '25px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
  },
  inputCard: {
    width: '100%',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  inputTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: '20px',
  },
  fileInputContainer: {
    width: '100%',
    marginBottom: '20px',
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    background: '#f0f0f0',
    borderRadius: '5px',
  },
  mediaContainer: {
    width: '100%',
    marginTop: '20px',
  },
  media: {
    width: '100%',
  },
  submitButton: {
    width: '100%',
    padding: '16px 0',
    marginTop: '40px',
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
}));