import React, { useEffect } from "react";
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

    const urlParams = new URLSearchParams(window.location.search);
    const searchData = {
      title: urlParams.get('title') || '',
      location: urlParams.get('location') || '',
      salaryLow: Number(urlParams.get('salary_low')) || 0,
      salaryHigh: Number(urlParams.get('salary_high')) || 0,
      position: urlParams.get('position') || '',
    };

    const searchApiData = Object.entries(searchData)
    .filter(([_, value]) => value !== '') // remove empty values
    .map(([key, value]) => `${key}=${value}`)
    .join('&');


    useEffect(() => {
      dispatch(getJobSearch(searchApiData));
    }, [searchApiData]);


    const { jobSearch, loading } = useSelector((state) => ({...state.api}));



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
