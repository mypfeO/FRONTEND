import React from 'react';
import { TextField, Button, Grid, Typography } from "@mui/material";
import bcrypt from 'bcryptjs';
import  login  from '../../Service/Login';
import { useStyles } from './LoginFormStyles';

const LoginForm = () => {
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const fixedSalt = '$2b$10$ZKV0tXmS5.XdG5ZrNtS/z.';
    const hashedPassword = bcrypt.hashSync(password, fixedSalt);

    try {
      const result = await login(username, hashedPassword);
      console.log('Login result:', result);
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const text = 'LOGIN';

  return (

       <Grid container justifyContent="center" style={{ paddingLeft: '30px' }}> 
      <Grid item xs={12} sm={12} md={9} className={classes.formContainer}>
        <div className={classes.letterContainer}>
          {[...text].map((letter, index) => (
            <div key={index} className={classes.letter}>{letter}</div>
          ))}
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.button}>Sign In</Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
