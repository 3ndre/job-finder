import React from "react";
// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import HeaderBanner from "./topstaff/HeaderBanner";
import TopStaffs from "./topstaff/TopStaffs";







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


export default function TopStaff() {


  return (
    <Page title="Top Staff">
     <RootStyle>   
     <ContentStyle>
        <HeaderBanner />
        <TopStaffs />
     </ContentStyle>
      </RootStyle>
    </Page>
  );
}
