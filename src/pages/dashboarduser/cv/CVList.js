import React, { useEffect } from 'react';

import Scrollbar from '../../../components/Scrollbar';
import SkeletonItem from '../../../components/SkeletonItem';
import EmptyContent from '../../../components/EmptyContent';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserCV } from '../../../redux/features/apiSlice';

//MUI
import {
  Card,
  Button,
  Typography,
  Table,
  Divider,
  TableBody,
  TableContainer,
  TableRow, TableCell, TableHead,  
} from '@mui/material';






const CVList = () => {

    const dispatch = useDispatch();


    const fetchUserCV = () => {
        dispatch(getUserCV());
      }
    
      useEffect(() => {
        fetchUserCV();
    }, []);


    const { loading, cv } = useSelector((state) => ({...state.api}));


  return (
    <>

    {loading ? (<SkeletonItem/>) : (

        <>    
    {cv && cv[0] && cv[0].length < 1 ? 
                        
        <EmptyContent
        title="Empty!"
        description={`You don't have any cv yet.`}
        sx={{
            '& span.MuiBox-root': { height: 160 },
        }}
        />

        :
        
    <Card> 
        <Divider />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative', mt: '13px'}}>

              <Table>
              <TableHead>
              
                    <TableRow>
                        <TableCell align="left">
                            Name
                        </TableCell>

                        <TableCell align="center">
                            Download
                        </TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>

                        {cv && cv.length > 0 && cv[0] && cv[0].map((item) => (

                        <TableRow hover key={item.id}>

                        <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.name}
                                </Typography>
                              </TableCell>

                    
                              <TableCell align="center">
                                <Button target="_blank" variant="outlined" href={`${process.env.REACT_APP_API_MAIN}${item.cv}`} >
                                    Download
                                </Button>
                              </TableCell>

                     </TableRow>
                     ))}
              
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        }

        </>
      )}
    </>
  )
}

export default CVList