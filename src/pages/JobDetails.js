import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// @mui
import { Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import SkeletonItemHome from '../components/SkeletonItemHome';
// hooks
import useSettings from '../hooks/useSettings';

//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../redux/features/apiSlice';
import JobMainCard from "./jobdetails/JobMainCard";
import JobDetailsCard from "./jobdetails/JobDetailsCard";




// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
  height: '100%',
  background: '#eef2ff',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(7),
}));


// ----------------------------------------------------------------------


export default function JobDetails() {

    const { themeStretch } = useSettings();

    const dispatch = useDispatch();

    const { jobById, loading } = useSelector((state) => ({...state.api}));

    let id = useParams().id;


    const fetchById = () => {
        dispatch(getJobById({id}));
    }
   
   
    useEffect(() => {
        fetchById();
    }, []);



  return (
    <Page title="Job Details">
     <RootStyle>   
     <Container maxWidth={themeStretch ? false : 'lg'}>


      {loading ? <><SkeletonItemHome /></> : 
      
      <>

     <Typography variant="h4" sx={{mb: 3}}>
        Job Details
     </Typography>
     
     <Grid container spacing={3}>
     <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <JobMainCard data={jobById[0]}/>  
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={2}>
            <JobDetailsCard data={jobById[0]}/>
        </Stack>
      </Grid>

     </Grid>

     </>}
    </Container>
      </RootStyle>
    </Page>
  );
}
