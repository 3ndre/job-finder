import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getApplicantsById, getJobById } from '../../redux/features/apiSlice';

import { Navigate } from 'react-router-dom';
// @mui
import { Container, Button } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components 
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import PostsApplicantsList from './applicants/PostsApplicantsList';

// ----------------------------------------------------------------------

export default function PostApplicants() {
  const { themeStretch } = useSettings();

  let id = useParams().id;
  const dispatch = useDispatch();

  const { loading, jobById } = useSelector((state) => ({...state.api}));


    const fetchApplicantsById = () => {
        dispatch(getApplicantsById({id}));
        dispatch(getJobById({id}));
    }


    useEffect(() => {
        fetchApplicantsById()
    }, []);






  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Applicants List">
      <Container maxWidth={themeStretch ? false : 'lg'}>


      <HeaderBreadcrumbs
          heading={jobById && jobById[0] ? jobById[0].title : 'Loading...'}
          links={[
            { name: 'Applicants List'},
          ]}
        />

          <PostsApplicantsList />
        

      </Container>
    </Page> 
  );
}
