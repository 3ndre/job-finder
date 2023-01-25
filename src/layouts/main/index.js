import { Outlet } from 'react-router-dom';
import MainFooter from './MainFooter';
// @mui
import { Box, Stack} from '@mui/material';

//
import MainHeader from './MainHeader';


// ----------------------------------------------------------------------

export default function MainLayout() {
 

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

     
        <Box
          sx={{
            
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >

          <MainFooter/>
        </Box>
      
    </Stack>
  );
}
