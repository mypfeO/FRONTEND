import React, { useState } from 'react';
import { TextField, Button, Grid, makeStyles } from '@material-ui/core';
import bcrypt from 'bcryptjs'; // Import hash function from bcryptjs for password hashing
import { login } from '../../Service/Login';
const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(8), // Move the component down
    width: '70%',
    display: 'flex',
    alignItems: 'center',
  },
  letterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(10),
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

const LoginForm = () => {
  const classes = useStyles();

  const handleHover = (event) => {
    event.target.style.transform = 'translateY(-5px)';
  };

  const handleMouseLeave = (event) => {
    event.target.style.transform = 'translateY(0)';
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const fixedSalt = '$2b$10$ZKV0tXmS5.XdG5ZrNtS/z.';
    const username = event.target.username.value; // Get the value of the username field
    const passwordd = event.target.password.value; // Get the value of the password field

    console.log('Username:', username); // Log the username to the console

    // Hash the password
   // Hash the password
const Password = bcrypt.hashSync(passwordd, fixedSalt); // Hash the password
// Hash the password
    console.log('Hashed Password:', Password); // Log the hashed password to the console

    // Handle form submission logic here, such as sending data to the server
    console.log('Form submitted');
    try {
        // Call the login function with the username and hashed password
        const result = await login(username, Password);
        console.log('Login result:', result); // Log the result of the login operation
        // Optionally, handle success or failure of the login operation here
      } catch (error) {
        console.error('Error occurred during login:', error); // Log any errors that occur during login
        // Optionally, handle errors during login here
      }
    // Optionally, you can clear the form fields after submission
    event.target.reset();
  };

  const text = 'LOGIN';

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
      </Grid>
    </Grid>
  );
};

export default LoginForm;
