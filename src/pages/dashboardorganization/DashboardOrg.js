import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Grid, Typography, Button, Box } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserByOrg, getJob, getAllUser } from '../../redux/features/apiSlice';
// ----------------------------------------------------------------------


const userData = JSON.parse(localStorage.getItem('user_data'));

export default function DashboardOrg() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  //------------------------Refer Code-------------------------------
  const [copied, setCopied] = useState(false);

  const clipboard = (id) => {
      setCopied(true);
      navigator.clipboard.writeText(id)
       setTimeout(() => {
          setCopied(false);
        }, 2000); 
    }

  //--------------------------------------------------------------------

  const { orgUser, loading, job, userList } = useSelector((state) => ({...state.api}));

  const fetchUser = () => {
    dispatch(getUserByOrg());
    dispatch(getJob());
    dispatch(getAllUser());
  }

    useEffect(() => {
      fetchUser();
  }, []);

  
  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Hi, Welcome!
          </Typography>
         
          <Button variant="outlined" sx={{ ml: 2 }}  onClick={() => clipboard(userData.userData.refer_id)}>
           {copied ? <>Copied!</> : <>Refer ID: {userData && userData.userData.refer_id === null ? <>-----</> : userData.userData.refer_id}</> }
          </Button>
         
        </Box>

        <Grid container spacing={3}>

        </Grid>
      </Container>
    </Page>
  );
}
