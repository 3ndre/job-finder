// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import SkeletonItem from '../components/SkeletonItem';





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


export default function LoadingPage() {
 

  return (
    <Page title="Loading">
     <RootStyle>   
      <ContentStyle>
       <SkeletonItem/>
      </ContentStyle>
      </RootStyle>
    </Page>
  );
}
