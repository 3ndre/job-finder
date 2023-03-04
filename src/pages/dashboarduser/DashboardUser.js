import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
//redux
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/features/apiSlice';

// ----------------------------------------------------------------------

export default function DashboardUser() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = () => {
    dispatch(getUser());
  }

  useEffect(() => {
    fetchUser();
    navigate('/');
}, []);

  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="User">
      <Container maxWidth={themeStretch ? false : 'xl'}>
       
      </Container>
    </Page>
  );
}
