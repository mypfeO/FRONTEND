import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2), // Adjust gap between select and button
  },
  backButton: {
    backgroundColor: '#f50057', // Example color
    color: '#ffffff',
    marginLeft: '10px',
    '&:hover': {
      backgroundColor: '#d50048',
    },
  },
  updateButton: {
    height: '40px',
    padding: '0 16px',
    backgroundColor: '#4A90E2', // Ensure it matches your theme
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#357ABD', // Darker blue on hover
    },
  },
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
    background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // Gradient background
    minHeight: '100vh', // Ensure it covers the full viewport height
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
  productImageContainer: {
    width: '100%',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
  },
  mobileProductImageContainer: {
    width: '100%',
    height: '150px',
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
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    margin: '0 auto',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '800px', // Adjust to control max width
    minHeight: '400px', // Minimum height to handle various views
  },
  mobileScrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    overflowX: 'hidden', // Remove horizontal scrollbar
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: '375px', // Match the mobile width
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
  viewSelect: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    color: '#4A90E2', // Change the text color
    '& .MuiSelect-icon': {
      color: '#4A90E2', // Change the dropdown arrow color
    },
  },
  selectInput: {
    color: '#4A90E2', // Change selected option text color
  },
  menuPaper: {
    backgroundColor: '#4A90E2', // Blue background color for the dropdown choices
    color: '#ffffff', // White text color for the dropdown choices
  },
  menuItem: {
    backgroundColor: '#4A90E2', // Blue background color for the menu item
    color: '#ffffff', // White text color for the menu item
    '&:hover': {
      backgroundColor: '#357ABD', // Darker blue on hover
    },
  },
  formTitle: {
    marginBottom: theme.spacing(2),
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  formItem: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    width: '100%',
  },
  textResponse: {
    padding: theme.spacing(1),
    border: '1px solid #ddd', // Light gray border
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    color: '#4A90E2', // Match text color to theme
  },
  mediaContainer: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  media: {
    width: '100%',
    height: 'auto',
    maxHeight: '200px', // Limit video height
    borderRadius: '8px',
  },
  mobileMediaContainer: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  mobileMedia: {
    width: '100%',
    height: 'auto',
    maxHeight: '150px', // Adjust height for better mobile view
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
  inputCard: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd', // Light gray border
  },
  inputTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: '#4A90E2',
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
    border: '1px solid #ddd', // Light gray border
  },
  logo: {
    maxWidth: '150px',
    maxHeight: '100px',
    objectFit: 'contain',
  },
  mobileLogo: {
    width: '50%',
    maxWidth: '150px',
    maxHeight: '75px',
    objectFit: 'contain',
    marginBottom: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
  input: {
    backgroundColor: '#ffffff', // Ensure background is white
    color: '#4A90E2', // Text color
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ddd', // Light gray border
      },
      '&:hover fieldset': {
        borderColor: '#4A90E2', // Blue border on hover
      },
    },
  },
  mobileInput: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff',
    color: '#4A90E2', // Blue text color
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ddd', // Light gray border
      },
      '&:hover fieldset': {
        borderColor: '#4A90E2', // Blue border on hover
      },
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
    fontSize: '1.25rem', // Increased font size for the footer links
    fontWeight: 'bold', // Set to bold if needed
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:active': {
      color: '#2a5c9d', // Darker blue when active
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  },
}));

export default useStyles;
