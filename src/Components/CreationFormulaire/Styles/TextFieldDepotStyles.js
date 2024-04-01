// TextFieldDepotStyles.js
import { styled } from '@mui/system';

const DepotContainer = styled('div')({
  opacity: 1,
  cursor: 'pointer',
  backgroundColor: '#31708f',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Shadow effect
  transition: 'opacity 0.3s ease-in-out',

  '&.dragging': {
    opacity: 0.5,
  },

  'h2': {
    color: '#fff', // Title color
    marginBottom: '10px', // Add space between title and text field
  },
});

export default DepotContainer;
