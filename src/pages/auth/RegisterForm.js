
import { useState } from 'react';
// @mui
import { Stack, IconButton, InputAdornment, Button, Grid, TextField } from '@mui/material';

// components
import Iconify from '../../components/Iconify';




// ----------------------------------------------------------------------

const RegisterForm = () => {

  
  const [showPassword, setShowPassword] = useState(false);


  return (
    <form>
      <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Grid>
            <TextField placeholder="First name" label="First name" variant="outlined" name="firs_tname" fullWidth  required autoComplete='off' />
        </Grid>

        <Grid>
            <TextField placeholder="Last name" label="Last name" variant="outlined" name="last_name" fullWidth  required autoComplete='off'/>
        </Grid>
        </Stack>
  
        <Grid >
            <TextField type="email" placeholder="Email" label="Email" variant="outlined"  fullWidth required autoComplete='off'/>
        </Grid>

        <Grid >
            <TextField type={showPassword ? 'text' : 'password'}  InputProps={{
                    endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
                </InputAdornment>
            ),}}
            placeholder="Password" label="Password" variant="outlined"  fullWidth required autoComplete='off'/>
        </Grid>

        <Button fullWidth size="large" type="submit" variant="contained" >
          Register
        </Button>
      </Stack>
    </form>
  );
}

export default RegisterForm;
