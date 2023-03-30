import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTopStaff } from '../../redux/features/apiSlice';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';



// components
import { MotionViewport } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import SkeletonItemHome from '../../components/SkeletonItemHome';
import TopStaffsList from './TopStaffsList';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(5),
    backgroundColor: '#eef2ff',
    paddingBottom: theme.spacing(3),
  }));



export default function TopStaffs() {


    const dispatch = useDispatch();
    const { loading, topStaff } = useSelector((state) => ({...state.api}));


    const fetchTopStaff = () => {
      dispatch(getTopStaff());
    }

    useEffect(() => {
      fetchTopStaff()
  }, []);
  

  return (
    <RootStyle>

      <Container component={MotionViewport}>


      {loading ? <><SkeletonItemHome /></> : 
      <>

          <TopStaffsList data={topStaff}/>
      
      </> }
      </Container>
    </RootStyle>
  );
}


