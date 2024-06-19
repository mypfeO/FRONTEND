import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar, Alert } from "@mui/material";
import { useStyles } from './SignUpFormStyles';
import { register } from '../../Service/Login';

const SignUpForm = ({ onSuccess }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors

    // Validate username
    if (!/^[a-zA-Z]+$/.test(formData.username) || formData.username.length < 6) {
      setErrors({ username: 'Username must be at least 6 characters long and contain only letters.' });
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters long.' });
      return;
    }

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    // Attempt to register the user
    try {
      await register(formData.username, formData.password);
      setSuccess(true);

      // Redirect to login form after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) onSuccess(); // Execute onSuccess callback
      }, 2000);
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  const text = 'SIGNUP';

  const handleHover = (event) => {
    event.target.style.transform = 'translateY(-5px)';
  };

  const handleMouseLeave = (event) => {
    event.target.style.transform = 'translateY(0)';
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={9} className={classes.formContainer}>
        <div className={classes.letterContainer}>
          {[...text].map((letter, index) => (
            <div
              key={index}
              className={classes.letter}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            >
              {letter}
            </div>
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
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
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
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          {errors.general && (
            <Alert severity="error">{errors.general}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
          </Button>
        </form>
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="success" 
            sx={{ 
              width: '100%', 
              bgcolor: 'white', // White background color
              color: 'green',   // Green text color
              border: '1px solid green' // Optional: Green border
            }}
          >
            Registration successful! Redirecting...
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
