import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
// @mui
import { Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import SkeletonItemHome from '../../components/SkeletonItemHome';


// hooks
import useSettings from '../../hooks/useSettings';

//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getUserCV, getJobById } from '../../redux/features/apiSlice';
import JobApplyForm from "./JobApplyForm";





// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
  height: '100%',
  background: '#eef2ff',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(7),
}));


// ----------------------------------------------------------------------


export default function JobApply() {

    const { themeStretch } = useSettings();

    const dispatch = useDispatch();

    const { cv, jobById, loading } = useSelector((state) => ({...state.api}));

    let id = useParams().id;



    const fetchUserCV = () => {
        dispatch(getUserCV());
        dispatch(getJobById({id}));
    }
   
   
    useEffect(() => {
        fetchUserCV();
    }, []);


    if (localStorage.getItem('access_token') === null) {
      return <Navigate to="/login" />;
    }


  return (
    <Page title="Job Apply">
     <RootStyle>   
     <Container maxWidth={themeStretch ? false : 'lg'}>


      {loading ? <><SkeletonItemHome /></> : 
      
      <>

     <Typography variant="h4" sx={{mb: 3}}>
        Applying for: {jobById && jobById[0] && jobById.length > 0 ? <>{jobById[0].title}</> : <></>}
     </Typography>

     {cv && jobById && cv[0] && jobById[0] && jobById.length > 0  ? 

         <JobApplyForm cv={cv[0]} job={jobById} id={id}/>

         :

         <SkeletonItemHome />
      }

     </>}
    </Container>
      </RootStyle>
    </Page>
  );
}
