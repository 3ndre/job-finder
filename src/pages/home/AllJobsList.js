import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Stack, Link, Card, Button, Divider, Typography} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
import useResponsive from '../../hooks/useResponsive';

// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function AllJobsList({data}) {
  
  return (
    <Card>

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          
            {data && data.results.map((item) => (
            <JobItem jobData={item} id={item.id}/>
            ))}

        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          Next
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------


function JobItem({jobData}) {

  const isDesktop = useResponsive('up', 'lg');
 
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%'}}>
      <Image alt="" src="https://via.placeholder.com/48" sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Link component={RouterLink} to="#" color="inherit" style={{textDecoration: 'none'}}>
          <Typography variant="subtitle2" noWrap>
          {isDesktop ? <> {jobData.title.length > 22 ? <>{jobData.title.substr(0, 22)}...</> : jobData.title}</>
          :
          <> {jobData.title.length > 6 ? <>{jobData.title.substr(0, 6)}...</> : jobData.title}</>}
           
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary'}} noWrap>   
        {isDesktop ? <> {jobData.description.length > 22 ? <>{jobData.description.substr(0, 22)}...</> : jobData.description}</>
          :
          <> {jobData.description.length > 6 ? <>{jobData.description.substr(0, 6)}...</> : jobData.description}</>}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 1, flexShrink: 0, color: 'text.secondary' }}>
          {fToNow(jobData.created_date)}
      </Typography>
      <Box sx={{  p: 2 }}>
      <Button
          to={`/job/${jobData.id}`}
          size="small"
          variant="outlined"
          component={RouterLink}
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View
        </Button>
        </Box>
    </Stack>
  );
}
