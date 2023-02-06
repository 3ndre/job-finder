
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button, Grid, TextField, CircularProgress, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

// components
import Iconify from '../../components/Iconify';

//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/features/apiSlice';


//--------------------------------------------------------------------------

const LoginForm = () => {

  const dispatch = useDispatch();  
  const { loading, logResponse } = useSelector((state) => ({...state.api}));
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(true);

  //------------------------------form state------------------------------

  const [loginData, setLoginData] = useState({email: '', password: ''});

  //------------------------------ Login event ---------------------------

  const handleLoginUser = (e) => {
    e.preventDefault();

    try{

      const logData = {
        email: loginData.email,
        password: loginData.password
      }

      dispatch(loginUser({logData})); //redux slice to log in
      setLoginData({email: '', password: ''});
      setOpen(true);

  } catch (e) {

    console.log(e);
    setLoginData({email: '', password: ''});
    setOpen(true);
  }
  }


  return (
    <>

    {loading === false ? 
    <form onSubmit={handleLoginUser}>
      <Stack spacing={3}>

      {logResponse !== null && logResponse.status !== 200 ? 
      <Collapse in={open}>
        <Alert severity="error" onClose={() => {setOpen(false);}} sx={{ mb: 1 }}>
        No active account found with the given credentials!
        </Alert>
      </Collapse>
      : null }

        <Grid >
          <TextField id="email" type="email" placeholder="Email" label="Email" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setLoginData({...loginData, email: e.target.value})} value={loginData.email}/>
        </Grid>

        <Grid>
          <TextField type={showPassword ? 'text' : 'password'} InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="password" placeholder="Password" label="Password" variant="outlined" fullWidth required autoComplete='off' onChange={e => setLoginData({...loginData, password: e.target.value})} value={loginData.password}/>
        </Grid>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link component={RouterLink} variant="subtitle2" to='/login'>
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained">
        Login
      </Button>
    </form>
    : 
    <>
    <Stack spacing={3} style={{alignItems: 'center'}}>
      <CircularProgress color="secondary" sx={{mt: 1}}/>
        <Typography color="text.secondary">Loading...</Typography>
    </Stack>
    </>}
    </>
  );
}

export default LoginForm;
