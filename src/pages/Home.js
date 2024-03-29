import { Navigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import HomeBanner from './home/HomeBanner';
import AllJobs from './home/AllJobs';




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


export default function Home() {
 

  return (
    <Page title="Home">
     <RootStyle>   
      <ContentStyle>
        <HomeBanner/>
        <AllJobs/>
      </ContentStyle>
      </RootStyle>
    </Page>
  );
}
