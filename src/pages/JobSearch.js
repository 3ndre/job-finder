import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';


//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getJobSearch } from '../redux/features/apiSlice';
import SearchBanner from "./jobsearch/SearchBanner";
import AllJobsSearch from "./jobsearch/AllJobsSearch";





// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------


export default function JobDetails() {

    const dispatch = useDispatch();

    let title = useParams().title;

    const { jobSearch, loading } = useSelector((state) => ({...state.api}));


    const fetchByTitle = () => {
      dispatch(getJobSearch({title}));
    }
 
 
       useEffect(() => {
         fetchByTitle();
     }, [title]);


  return (
    <Page title="Job Details">
     <RootStyle>   
     <ContentStyle>
      <SearchBanner />
      <AllJobsSearch data={jobSearch[0]} loading={loading} />
     </ContentStyle>
      </RootStyle>
    </Page>
  );
}
