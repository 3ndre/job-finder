import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
//redux
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/features/apiSlice';

// ----------------------------------------------------------------------

export default function DashboardOrg() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const fetchUser = () => {
    dispatch(getUser());
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
        <Typography variant="h3" component="h1" paragraph>
          Dashboard
        </Typography>
      </Container>
    </Page>
  );
}
