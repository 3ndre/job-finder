import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import Iconify from '../components/Iconify';

import { Navigate } from 'react-router-dom';
// @mui
import { Container, Button } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components 
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import UserList from './user/UserList';
// import EmptyContent from '../components/EmptyContent';

// ----------------------------------------------------------------------

export default function UserBoard() {
  const { themeStretch } = useSettings();




  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="User Board">
      <Container maxWidth={themeStretch ? false : 'lg'}>


      <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'User List'},
          ]}
          action={
            <Button component={RouterLink} variant="contained" startIcon={<Iconify icon="material-symbols:add"/>} to={'/user-board/create'}>User</Button>
          }
        />

         
        <UserList />

      </Container>
    </Page> 
  );
}
