import React  from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Link, Container, Typography, Card, CardContent } from '@mui/material';

// components
import Page from '../../components/Page';
// sections
import LoginForm from './LoginForm';

//--------------------Redux---------------------------------
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  background: '#eef2ff'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 420,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',

}));



// ----------------------------------------------------------------------

export default function Login() {

  const { loading } = useSelector((state) => ({...state.api}));


  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          
          <ContentStyle>

            {loading === false ? 
            <>
            <Stack direction="row" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Log in 
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>Enter your details below.</Typography>
              </Box>
            </Stack>
            <Card>
            <CardContent>
              <LoginForm />
            </CardContent>
            </Card>
              <Typography variant="body2" align="center" sx={{mt: 3}}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to='/register'>
                  Get started
                </Link>
              </Typography>
            </>

            :

            <>

            <Stack direction="row" alignItems="center">
              <Box sx={{ flexGrow: 1, mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                  Authenticating...
                </Typography>
              </Box>
            </Stack>

            <Card>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>

            </>

            }
           
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
