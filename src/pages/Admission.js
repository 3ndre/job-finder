import React from "react";
// @mui
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import HeaderBannerAdmission from "./admission/HeaderBannerAdmission";
import AdmissionCard from "./admission/AdmissionCard";







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


export default function Admission() {


  return (
    <Page title="Admission">
     <RootStyle>   
     <ContentStyle>
        <HeaderBannerAdmission />

        <Grid container spacing={3}>
          

        <Grid item xs={12}>
            
        <Box sx={{ margin: 5, display: 'grid', gap: 5, gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', }, }} >
        {[...Array(4)].map((i, index) => 
          <AdmissionCard key={index}/>
         )}

        </Box>
        </Grid>
        </Grid>
     </ContentStyle>
      </RootStyle>
    </Page>
  );
}
