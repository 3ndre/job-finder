import React from 'react';

import { Navigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// components 
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import JobBoardForm from './JobBoardForm';




// ----------------------------------------------------------------------

export default function JobBoardIndex() {
  const { themeStretch } = useSettings();



  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Create New Job">
      <Container maxWidth={themeStretch ? false : 'lg'}>



      <HeaderBreadcrumbs
          heading="Create Job"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Job Board', href: '/job-board'},
            { name: 'Create Job'},
          ]}

        />


          <JobBoardForm />
        

      </Container>
    </Page> 
  );
}
