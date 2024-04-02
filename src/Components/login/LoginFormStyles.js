import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    formContainer: {
        marginTop: theme.spacing(8),
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: theme.spacing(12), // Ajoutez cette ligne pour déplacer le formulaire vers la droite
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
    width: '100%', // Ensure form takes full width of its container
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  }
}));
