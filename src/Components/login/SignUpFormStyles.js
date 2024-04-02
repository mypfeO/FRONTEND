import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(8),
    width: '70%',
    display: 'flex',
    alignItems: 'center',
  },
  letterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(-10),
  },
  letter: {
    margin: theme.spacing(1),
    transition: 'transform 0.2s',
    color: '#3f51b5',
    fontFamily: 'Arial, sans-serif',
    fontSize: '3.2rem',
    fontStyle: 'italic',
    fontWeight: 'bold',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  form: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));
