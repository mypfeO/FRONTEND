import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Service/Login';
import { useStyles } from './LoginFormStyles';

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const fixedSalt = '$2a$10$CwTycUXWue0Thq9StjUM0u'; // Use a fixed salt for simplicity
    const hashedPassword = bcrypt.hashSync(password, fixedSalt); // Hash the password with the fixed salt

    try {
      const result = await login(username, hashedPassword); // Send username and hashed password
      console.log('Login result:', result);
      localStorage.setItem('jwtToken', result.token); // Save the token in localStorage

      // Decode the token manually to get user ID
      const decodedToken = decodeToken(result.token);
      localStorage.setItem('userId', decodedToken.UserId); // Store user ID in localStorage

      // Show success message
      setSuccess(true);

      // Redirect to PageList after 2 seconds
      setTimeout(() => {
        navigate('/pages'); // Redirect to the PageList component
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Extract the message from the error response
        const errorMessage = error.response.data.errors[0]?.message || 'An unexpected error occurred';
        setErrors({ general: errorMessage });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  return (
    <Grid container justifyContent="center" style={{ paddingLeft: '30px' }}>
      <Grid item xs={12} sm={12} md={9} className={classes.formContainer}>
        <div className={classes.letterContainer}>
          {'LOGIN'.split('').map((letter, index) => (
            <div key={index} className={classes.letter}>{letter}</div>
          ))}
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign In
          </Button>
        </form>
        {errors.general && (
          <Typography color="error" variant="body2">{errors.general}</Typography>
        )}
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{
              width: '100%',
              bgcolor: 'white',
              color: 'green',
              border: '1px solid green',
            }}
          >
            Login successful! Redirecting...
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
