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
import OrganizationList from './user/OrganizationList';
// import EmptyContent from '../components/EmptyContent';

// ----------------------------------------------------------------------

export default function OrganizationBoard() {
  const { themeStretch } = useSettings();




  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Organization Board">
      <Container maxWidth={themeStretch ? false : 'lg'}>


      <HeaderBreadcrumbs
          heading="Organization List"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Organization List'},
          ]}
          action={
            <Button component={RouterLink} variant="contained" startIcon={<Iconify icon="material-symbols:add"/>} to={'/org-board/create'}>New</Button>
          }
        />

         
        <OrganizationList />

      </Container>
    </Page> 
  );
}
