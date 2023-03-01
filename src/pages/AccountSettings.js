import React, { useEffect } from 'react';

import { Navigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/features/apiSlice';
import AccountGeneral from './account/AccountGeneral';
import SkeletonItem from '../components/SkeletonItem';

// ----------------------------------------------------------------------

export default function AccountSettings() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({...state.api}));

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
    <Page title="Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>

      <HeaderBreadcrumbs
          heading="Settings"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Settings'},
          ]}
        />

    {user && user.length > 0 && user[0] ? 
      <>
        <AccountGeneral data={user[0]}/>   
      </>
      :
      <SkeletonItem/>
    }
       
      </Container>
    </Page>
  );
}   
