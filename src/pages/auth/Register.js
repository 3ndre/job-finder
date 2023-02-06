// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Card, CardContent } from '@mui/material';

// components
import Page from '../../components/Page';
// sections
import RegisterForm from './RegisterForm';
// Redux
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(12),
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

const ContentStyle2 = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',

}));

// ----------------------------------------------------------------------

export default function Register() {

  const { regResponse, loading } = useSelector((state) => ({...state.api}));

  return (
    <Page title="Register">
      <RootStyle>
        <Container maxWidth="sm">
          
          {regResponse !== null && regResponse.status === 201 ? 

          <ContentStyle2>
            <RegisterForm />
          </ContentStyle2>

            :

            <>
            <ContentStyle>
            <Stack direction="row" alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                {loading === false ? <>Get started right away</> : <>Registering...</>}
                </Typography>
                {loading === false ? <Typography sx={{ color: 'text.secondary', mb: 3 }}>Enter your details below.</Typography> : null}
              </Box>
            </Stack>
            <Card>
            <CardContent>
            <RegisterForm />
            </CardContent>
            </Card>
            </ContentStyle>
            </> 

          }

        </Container>
      </RootStyle>
    </Page>
  );
}
