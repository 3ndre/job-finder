import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Stack, Container, Typography, Card, CardContent, Button } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { activateUser } from '../../redux/features/apiSlice';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  background: '#eef2ff'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',

}));

// ----------------------------------------------------------------------

export default function Activate() {

  let id = useParams().id;
  let token = useParams().token;

  const dispatch = useDispatch();  
  const { actResponse } = useSelector((state) => ({...state.api}));


  function activateAccount() {

    try{

      const activateData = {
        uid: id,
        token: token
      }
      dispatch(activateUser({activateData})); //redux slice to activate user

    } catch (e) {
      console.log(e);
    }

  }


  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <Page title="Activate" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
        <ContentStyle>
          <Box >
          <Card>
            <CardContent>

        { actResponse !== null && actResponse === 204 ? 
        
          <>
          <Typography variant="h3" paragraph style={{display: 'flex', justifyContent: 'center'}}>
                  Account activated!!
                </Typography>

                <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 3, mt: 1 }}>
                  Your account has been activated. Simply go to the login page and log in to your account.
                </Typography>

                <Stack spacing={3} style={{alignItems: 'center'}}>
                  <Button variant="contained" component={RouterLink} to="/login">Login</Button>
                </Stack>

               

          </>
          : actResponse !== null && actResponse !== 204 ? 
          <>
     
            <Typography variant="h3" paragraph style={{display: 'flex', justifyContent: 'center'}}>
              Activation failed!
            </Typography>

            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 2, mt: 1 }}>
              The activation link has either expired or the token is incorrect.
            </Typography>
          </>

          : 

          <>
          <Typography variant="h3" paragraph style={{display: 'flex', justifyContent: 'center'}}>
              Activating your account...
            </Typography>

            <Stack spacing={3} style={{alignItems: 'center'}}>
              <CircularProgress color="secondary" sx={{mt: 1, mb: 1}}/>
            </Stack>

            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 2, mt: 1 }}>
              Do not close this window, you will be notified once your account is activated.
            </Typography>
          </>

          }   
            </CardContent>
            </Card>
          </Box>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
