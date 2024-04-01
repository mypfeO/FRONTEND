import React, { useState } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const useStyles = makeStyles((theme) => ({
  leftText: {
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(4),
    color: '#3f51b5',
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    position: 'absolute', // Set position to absolute
    left: theme.spacing(27),
    right: theme.spacing(28),
  },
  button: {
    width: '390px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [showLoginForm, setShowLoginForm] = useState(true); // State to track which form to display

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm); // Toggle between login and sign-up forms
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h5" align="left" gutterBottom className={classes.leftText}>
          {showLoginForm ? 'Welcome Back!' : 'Welcome'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
        {showLoginForm ? (
          <LoginForm />
        ) : (
          <SignUpForm />
        )}
        <Grid container justifyContent="center" className={classes.buttonContainer}>
          
          <Button
            onClick={toggleForm}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {showLoginForm ? 'Switch to Sign Up' : 'Switch to Login'}
          </Button>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
