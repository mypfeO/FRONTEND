import React, { useState } from 'react';
import { TextField, Button, Grid } from "@mui/material";
import { useStyles } from './SignUpFormStyles'; // Importez useStyles de votre nouveau fichier

const SignUpForm = ({ onSubmit }) => {
  const classes = useStyles(); // Utilisez useStyles pour accéder à vos styles
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate username
    if (!/^[a-zA-Z]+$/.test(formData.username) || formData.username.length < 6) {
      setErrors({ username: 'Username must be at least 6 characters long and contain only letters.' });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: 'Invalid email address.' });
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters long.' });
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    // Hash the password
    const hashedPassword = await hash(formData.password, 10); // Hash the password

    // Call the onSubmit function with form data and hashed password
    onSubmit({ ...formData, password: hashedPassword });
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
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
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
        </Grid>
      </Grid>
      
    );
  };
  
  export default SignUpForm;
  