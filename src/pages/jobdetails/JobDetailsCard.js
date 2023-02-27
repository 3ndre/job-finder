// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));


export default function JobDetailsCard({data}) {
  

  return (
    <Card>
      <CardHeader title={data && data.title} />

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row">
        <IconStyle icon={'fluent:text-description-20-regular'} />
        <Typography variant="body2"><span style={{fontWeight: 'bold'}}>Description:</span> {data && data.description}</Typography>
        </Stack>

        <Stack direction="row">
        <IconStyle icon={'eos-icons:role-binding-outlined'} />
          <Typography variant="body2">
            <span style={{fontWeight: 'bold'}}>Position:</span> {data && data.position}
          </Typography>
        </Stack>

        <Stack direction="row">
        <IconStyle icon={'ph:money'} />
          <Typography variant="body2">
            <span style={{fontWeight: 'bold'}}>Salary:</span> {data && data.salary_low} - {data && data.salary_high}
          </Typography>
        </Stack>

        <Stack direction="row">
        <IconStyle icon={'ic:round-access-time'} />
          <Typography variant="body2"><span style={{fontWeight: 'bold'}}>Time:</span> {data && data.time_low} - {data && data.time_high}</Typography>
        </Stack>

        <Stack direction="row">
        <IconStyle icon={'maki:lodging'} />
          <Typography variant="body2"><span style={{fontWeight: 'bold'}}>Lodging:</span> {data && (data.lodging).toString()}</Typography>
        </Stack>

       
      </Stack>
    </Card>
  );
}
