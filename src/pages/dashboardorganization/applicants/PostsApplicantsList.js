import React from 'react';
import { useSelector } from 'react-redux';
import Scrollbar from '../../../components/Scrollbar';
import SkeletonItem from '../../../components/SkeletonItem';
import EmptyContent from '../../../components/EmptyContent';



//MUI
import {
  Card,
  Typography,
  Table,
  Divider,
  TableBody,
  TableContainer,
  TableRow, TableCell, TableHead,  
} from '@mui/material';

import dayjs from 'dayjs';
import CoverLetter from './CoverLetter';
import CVUser from './CVUser';




const PostsApplicantsList = () => {
  

  const { loading, applicantsById } = useSelector((state) => ({...state.api}));
    

//----------------------------------------------------------------



  return (
    <>


    
    {loading ? (<SkeletonItem/>) : (

      <>    
      {applicantsById.length < 1 ? 
                      
        <EmptyContent
        title="Empty!"
        description={`You don't have any applicants yet.`}
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
                        <TableCell align="center">
                            Email
                        </TableCell>

                        <TableCell align="center">
                            Phone
                        </TableCell>

                        <TableCell align="center">
                            Applied on
                        </TableCell>

                        <TableCell align="center">
                            Documents
                        </TableCell>
                       
                    </TableRow>

                </TableHead>

                <TableBody>

                        {applicantsById && applicantsById.length > 0 && applicantsById[0] && applicantsById[0].length > 0 && applicantsById[0].map((item) => (

                        <TableRow hover key={item.id}>

                        <TableCell align="center">
                                <Typography variant="subtitle2" noWrap>
                                    {item.email}
                                </Typography>
                              </TableCell>

                    
                              <TableCell align="center">
                                <Typography variant="subtitle2" noWrap>
                                    {item.phone}
                                </Typography>
                              </TableCell>

                              <TableCell align="center">
                                <Typography variant="subtitle2" noWrap>
                                  {dayjs(item.created_date).format('MMM D, YYYY')}
                                </Typography>
                              </TableCell>

                              <TableCell align="center">
                               <CoverLetter item={item} /> / <CVUser item={item} />
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

export default PostsApplicantsList