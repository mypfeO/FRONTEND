import React, { useState } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => setShowLoginForm(!showLoginForm);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          sx={{
            textAlign: 'left',
            ml: 2, // shorthand for marginLeft with theme spacing
            mt: 4, // shorthand for marginTop with theme spacing
            color: 'primary.main',
          }}
        >
          {showLoginForm ? 'Welcome Back!' : 'Welcome'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
        {showLoginForm ? <LoginForm /> : <SignUpForm />}
        <Grid
          container
          justifyContent="center"
          sx={{
            mt: 2, // shorthand for marginTop
            position: 'absolute',
            left: (theme) => theme.spacing(27),
            right: (theme) => theme.spacing(28),
          }}
        >
          <Button
            onClick={toggleForm}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ width: '390px' }}
          >
            {showLoginForm ? 'Switch to Sign Up' : 'Switch to Login'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
