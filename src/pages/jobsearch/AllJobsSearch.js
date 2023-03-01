import React, { useState } from 'react';
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
import SkeletonItemHome from '../../components/SkeletonItemHome';
import AllJobsListSearch from './AllJobsListSearch';
import EmptyContent from '../../components/EmptyContent';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(5),
    backgroundColor: '#eef2ff',
    paddingBottom: theme.spacing(3),
  }));



export default function AllJobsSearch({data, loading}) {

    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');

    const [filter, setFilter] = useState('Latest');

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };

 
  
  return (
    <RootStyle>

      <Container component={MotionViewport}>

      <HeaderBreadcrumbs
          heading={`Results for "${title !== null ? title : ''}"`}
          links={[
            { name: `${data ? `(${data.count} jobs)` : '(0 jobs)'}`}
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
        {data === undefined || null || data.length < 1 ? 
        
          <>

          <EmptyContent
                  title="No results found!"
                  description={`We couldn't find what you searched for.`}
                  sx={{
                    '& span.MuiBox-root': { height: 160 },
                  }}
                />

          </>

        :
     
          <AllJobsListSearch data={data}/>

        }
      
      </> }
      </Container>
    </RootStyle>
  );
}


