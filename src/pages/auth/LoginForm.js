
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Stack,IconButton, InputAdornment, Button, Grid, TextField } from '@mui/material';

// components
import Iconify from '../../components/Iconify';




// ----------------------------------------------------------------------

const LoginForm = () => {

  
  const [showPassword, setShowPassword] = useState(false);


  return (
    <form>
      <Stack spacing={3}>

        <Grid >
          <TextField type="email" placeholder="Email" label="Email" variant="outlined"  fullWidth required autoComplete='off'/>
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
          placeholder="Password" label="Password" variant="outlined"  fullWidth required autoComplete='off'/>
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
  );
}

export default LoginForm;
