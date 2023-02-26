import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJob } from '../../redux/features/apiSlice';
// @mui
import { styled } from '@mui/material/styles';
import { Box,  Container } from '@mui/material';

//form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// components
import { MotionViewport } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import AllJobsList from './AllJobsList';
import SkeletonItemHome from '../../components/SkeletonItemHome';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(5),
    backgroundColor: '#eef2ff',
    paddingBottom: theme.spacing(3),
  }));



export default function AllJobs() {


    const dispatch = useDispatch();
    const { loading, job } = useSelector((state) => ({...state.api}));


    const [filter, setFilter] = useState('Latest');

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };


    const fetchJob = () => {
      dispatch(getJob());
    }

    useEffect(() => {
      fetchJob()
  }, []);
  


  return (
    <RootStyle>

      <Container component={MotionViewport}>

      <HeaderBreadcrumbs
          heading="All Jobs"
          links={[
            { name: `${job && job.length > 0 ? `(${job[0].count} jobs)` : '(0 jobs)'}`}
          ]}
          action={
            <Box sx={{ minWidth: 120}}>
              <FormControl fullWidth  size="small">
                <InputLabel >Sort by</InputLabel>
                <Select
                  value={filter}
                  label="Sort by"
                  onChange={handleChangeFilter}
                  autoComplete='off'
                >
                  <MenuItem value={"Latest"}>Latest</MenuItem>
                  <MenuItem value={"Oldest"}>Oldest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          }
        />



      {loading ? <><SkeletonItemHome /></> : 
      <>

          <AllJobsList data={job[0]}/>
      
      </> }
      </Container>
    </RootStyle>
  );
}


