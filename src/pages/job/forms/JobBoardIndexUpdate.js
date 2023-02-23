import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Navigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// components 
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import JobBoardUpdateForm from './JobBoardUpdateForm';

//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../../../redux/features/apiSlice';
import SkeletonItem from "../../../components/SkeletonItem";


// ----------------------------------------------------------------------

export default function JobBoardIndexUpdate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch(); 


  const { jobById } = useSelector((state) => ({...state.api}));


  let id = useParams().id;
  
 
  const fetchById = () => {
     dispatch(getJobById({id}));
   }


      useEffect(() => {
        fetchById();
    }, []);



  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Update Job">
      <Container maxWidth={themeStretch ? false : 'lg'}>



      <HeaderBreadcrumbs
          heading="Update Job"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Job Board', href: '/job-board'},
            { name: 'Update Job'},
          ]}

        />


          {jobById && jobById.length > 0 && jobById[0] ? 
          <>
           <JobBoardUpdateForm data={jobById} id={id} />
          </>
            :
          <SkeletonItem/>
          }
        

      </Container>
    </Page> 
  );
}
