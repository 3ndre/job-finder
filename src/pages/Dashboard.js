import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Grid, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import StatsCard from '../components/dashboard-section/StatsCard';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserByOrg, getJob, getAllUser } from '../redux/features/apiSlice';
// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

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

      <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome
        </Typography>

        <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Organizations" total={loading ? <>...</> : orgUser && orgUser[0] ? orgUser[0].count : <>...</> } icon={'icons8:organization'} color="info"/>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Users" total={loading ? <>...</> : userList && userList[0] ? userList[0].count : <>...</> } icon={'mdi:users'} color="warning"/>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Jobs" total={loading ? <>...</> : job && job[0] ? job[0].count : <>...</> } icon={'material-symbols:work'} color="secondary"/>
        </Grid>


        </Grid>
      </Container>
    </Page>
  );
}
