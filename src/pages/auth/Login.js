import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Link, Container, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
// sections
import LoginForm from './LoginForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  background: '#eef2ff'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',

}));

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <Page title="Login">
      <RootStyle>
        

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mt: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Log in 
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>Enter your details below.</Typography>
              </Box>

              
            </Stack>

            

            <LoginForm />

           
              <Typography variant="body2" align="center" sx={{mt: 3}}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to='/register'>
                  Get started
                </Link>
              </Typography>
           
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
