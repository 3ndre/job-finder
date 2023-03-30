import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import Iconify from '../../components/Iconify';

import { Navigate } from 'react-router-dom';
// @mui
import { Container, Button } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components 
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import PostsList from './applicants/PostsList';
// import EmptyContent from '../components/EmptyContent';

// ----------------------------------------------------------------------

export default function PostsBoard() {
  const { themeStretch } = useSettings();




  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Job Board">
      <Container maxWidth={themeStretch ? false : 'lg'}>


      <HeaderBreadcrumbs
          heading="Job List"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Job List'},
          ]}
          action={
            <Button component={RouterLink} variant="contained" startIcon={<Iconify icon="material-symbols:add"/>} to={'/job-board/create'}>Post</Button>
          }
        />

          <PostsList/>
        

      </Container>
    </Page> 
  );
}
