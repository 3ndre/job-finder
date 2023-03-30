import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Avatar, Card, Button, Divider, Typography, TableBody, TableContainer, TableRow, TableCell, TableHead, Table} from '@mui/material';


// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function TopStaffsList({data}) {

  
  return (
    <Card>

      <Scrollbar>
      <TableContainer sx={{ minWidth: 800, position: 'relative', mt: '13px'}}>

        <Table>
        <TableHead>

            <TableRow>
                <TableCell align="left">
                    Full Name
                </TableCell>

                <TableCell align="left">
                    Gender
                </TableCell>

                <TableCell align="left">
                    Experience
                </TableCell>

                <TableCell align="left">
                    Status
                </TableCell>
            </TableRow>

        </TableHead>

        <TableBody>

                {data && data.length > 0 && data[0] && data[0].map((item) => (

                <TableRow hover key={item.id}>

                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={item.fist_name} src={item.avatar !== null ? `${process.env.REACT_APP_API_URL}${item.avatar}` : <Iconify icon={'ic:round-image'} width={50} height={50} />} sx={{ mr: 2 }} />
                        <Typography variant="subtitle2" noWrap>
                            {item.first_name} {item.last_name}
                        </Typography>
                    </TableCell>

                <TableCell align="left">
                    <Typography variant="subtitle2" noWrap >
                        {item.gender.toLowerCase().charAt(0).toUpperCase() + item.gender.toLowerCase().slice(1)}
                    </Typography>
                </TableCell>

                <TableCell align="left">
                    <Typography variant="subtitle2" noWrap>
                        {item.experience} yrs
                    </Typography>
                </TableCell>

                <TableCell align="left">
                  
                    <Label color={`${item.is_available === true ? 'success' : 'error'}`}>
                        {item.is_available ? 'Available' : 'Not available'}
                    </Label>
                 
                </TableCell>

            </TableRow>
            ))}

        </TableBody>
        </Table>
        </TableContainer>
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

