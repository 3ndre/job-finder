import React, { useEffect } from 'react';
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


//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/features/apiSlice';
import UploadCV from './cv/UploadCV';
import CVList from './cv/CVList';

// ----------------------------------------------------------------------

export default function CV() {
  const { themeStretch } = useSettings();

  
  const dispatch = useDispatch();

  const fetchUser = () => {
    dispatch(getUser());
  }

  useEffect(() => {
    fetchUser();
}, []);


const { user } = useSelector((state) => ({...state.api}));



  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="My CVs">
      <Container maxWidth={themeStretch ? false : 'lg'}>


      <HeaderBreadcrumbs
          heading="CV List"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'CV List'},
          ]}
          action={
            user && user.length > 0 ? <UploadCV data={user[0]} /> : <Button variant="contained" disabled startIcon={<Iconify icon="material-symbols:add"/>}>New</Button>
          }
        />


           
        <CVList />

      </Container>
    </Page> 
  );
}
