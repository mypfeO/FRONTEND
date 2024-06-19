import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import '../CreationFormulaire/Styles/Formulaire.css'; // Ensure this imports your styles
const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

    
    useEffect(() => {
    // Set body background color to white when Login component is mounted
    document.body.style.background = '#FFFFFF';

    // Cleanup: Reset to gradient background when component is unmounted
    return () => {
      document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };
  }, []);
    const handleSuccess = () => {
      // Redirect to login form after registration
      setShowLoginForm(true);
    };  
  
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
        
          {showLoginForm ? <LoginForm /> : <SignUpForm onSuccess={handleSuccess} />}
        
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
