// src/Components/styles.js

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
    background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    minHeight: '100vh',
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
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: '#000',
    borderRadius: '25px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
  },
  logoInCard: {
    width: '30%',
    maxWidth: '150px',
    objectFit: 'contain',
    marginBottom: theme.spacing(2),
  },
  productImageContainerInCard: {
    width: '100%',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
  },
  productImage: {
    maxHeight: '100%',
    objectFit: 'cover',
  },
  inputCard: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
  },
  inputTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff',
    color: '#4A90E2',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ddd',
      },
      '&:hover fieldset': {
        borderColor: '#4A90E2',
      },
    },
  },
  fileInputContainer: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  fileInput: {
    width: '100%',
    padding: theme.spacing(1),
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  mediaContainer: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  media: {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    borderRadius: '8px',
  },
  submitButton: {
    width: '100%',
    padding: '16px 0',
    marginTop: theme.spacing(4),
    fontSize: '1.25rem',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#43a047',
    },
  },
  footerLinksContainer: {
    width: '100%',
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  footerLink: {
    display: 'block',
    margin: theme.spacing(1, 0),
    color: '#4A90E2',
    textDecoration: 'none',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:active': {
      color: '#2a5c9d',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: theme.palette.error.main,
  },
  formTitle: {
    marginBottom: theme.spacing(2),
    color: '#4A90E2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    maxWidth: '300px', // Adjust this as needed
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  commentHeader: {
    fontWeight: 'bold',
  },
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  comment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#FF5722', // Color for the user name
    marginRight: theme.spacing(1),
  },
  commentText: {
    flex: 1,
    fontSize: '1.1rem', // Increased text size
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
    color: '#f50057', // Color for the delete icon
  },
  commentInput: {
    marginTop: theme.spacing(2),
    fontSize: '1.1rem', // Increased text size
  },
}));

export default useStyles;
