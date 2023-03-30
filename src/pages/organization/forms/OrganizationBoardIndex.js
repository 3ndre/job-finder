import React from 'react';

import { Navigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// components 
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import OrganizationBoardForm from './OrganizationBoardForm';




// ----------------------------------------------------------------------

export default function OrganizationBoardIndex() {
  const { themeStretch } = useSettings();



  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Create New Organization">
      <Container maxWidth={themeStretch ? false : 'lg'}>



      <HeaderBreadcrumbs
          heading="Create User"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Organization Board', href: '/org-board'},
            { name: 'Create Organization'},
          ]}

        />

          <OrganizationBoardForm />
     

      </Container>
    </Page> 
  );
}
