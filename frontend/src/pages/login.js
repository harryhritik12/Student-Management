

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { setLogin } from "../states";
import { Navbar } from '../components/navbar';
import WidgetWrapper from '../components/WidgetWrapper';
import Face3RoundedIcon from '@mui/icons-material/Face3Rounded';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.iiitg.ac.in/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    let password = data.get('password');


    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const loggedIn = await response.json();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );

        if (loggedIn.type === "student") {
          navigate(`/student/${loggedIn.user.rollNumber}`);
        } else if (loggedIn.type === "faculty") {
          navigate(`/faculty/${loggedIn.user.facultyID}`);
        } else {
          navigate(`/staff/${loggedIn.user.staffID}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <Box>
      <Navbar />
      <Box padding="2rem 25%">
        <CssBaseline />
        <WidgetWrapper>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Face3RoundedIcon  fontSize='large'/>
            <Typography color="#00D5FA" fontSize="1rem"
              fontWeight="300">
              SIGN IN
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
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
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup/student" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </WidgetWrapper>
      </Box>
    </Box>
  );
}