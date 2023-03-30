import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob, getJob } from '../../../redux/features/apiSlice';
import Scrollbar from '../../../components/Scrollbar';
import SkeletonItem from '../../../components/SkeletonItem';
import EmptyContent from '../../../components/EmptyContent';
import TableMoreMenu from '../../../components/TableMoreMenu';
import Iconify from '../../../components/Iconify';



//MUI
import {
  Button,
  Card,
  MenuItem,
  Typography,
  Table,
  Divider,
  TableBody,
  TableContainer,
  TableRow, TableCell, TableHead,  
} from '@mui/material';

import dayjs from 'dayjs';




const PostsList = () => {


  const userData = JSON.parse(localStorage.getItem('user_data'));
  const authorId = userData.userData.id;


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, job } = useSelector((state) => ({...state.api}));
    

  //Pop over menu table------------------------------------------
  const [openMenu, setOpenMenuActions] = useState(null);
  const [currentId, setCurrentId] = useState(null); //getting row ID for Popover
 

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
    setCurrentId(null);
  };
//----------------------------------------------------------------

//-----------------------CRUD Action-----------------------------------

  const fetchJob = () => {
    dispatch(getJob());
  }


const handleDelete = (id) => {
    
    dispatch(deleteJob({id: id}))
    .then(() => {
      // Fetch the updated job list
      dispatch(getJob());
    });
    setOpenMenuActions(null);

  }


  const handleNavigate = (id) => {

      navigate(`/job-board/update/${id}`)
     window.location.reload();

  }


  const handleNavigateApplicants = (id) => {
    navigate(`/job-board/applicants/${id}`)

}



  useEffect(() => {
    fetchJob()
}, []);



  function findJobById(id) {
  
    if (job && job[0] && job[0].results) {
      const matchingPost = job[0].results.filter((job) => job.author.id === id);
      return matchingPost.length > 0 ? matchingPost : [];
    }
    return [];
  }

  const matchingPosts = findJobById(authorId);



  return (
    <>


    
    {loading ? (<SkeletonItem/>) : (

      <>    
      {matchingPosts.length < 1 ? 
                      
        <EmptyContent
        title="Empty!"
        description={`You don't have any listed jobs yet.`}
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
                            Title
                        </TableCell>

                        <TableCell align="left">
                            Description
                        </TableCell>

                        <TableCell align="left">
                            Position
                        </TableCell>

                        <TableCell align="left">
                            Created on
                        </TableCell>

                        <TableCell align="left">
                            Applicants
                        </TableCell>
                       
                        <TableCell></TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>

                        {matchingPosts && matchingPosts.length > 0 && matchingPosts.map((item) => (

                        <TableRow hover key={item.id}>

                        <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.title.length > 12 ? <>{item.title.substr(0, 12)}...</> : item.title}
                                </Typography>
                              </TableCell>

                    
                              <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.description.length > 12 ? <>{item.description.substr(0, 12)}...</> : item.description}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.position.length > 12 ? <>{item.position.substr(0, 12)}...</> : item.position}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {dayjs(item.created_date).format('MMM D, YYYY')}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                               <Button variant='outlined' onClick={() => handleNavigateApplicants(item.id)}>View</Button>
                              </TableCell>
        
                         
                          <TableCell align="right" onClick={() => {setCurrentId(item.id);}}>
                            <TableMoreMenu open={openMenu} onOpen={handleOpenMenu} onClose={handleCloseMenu}
                              actions={
                                <>
                                  <MenuItem  onClick={() => handleNavigate(currentId)}>
                                    <Iconify icon={'material-symbols:edit'} />
                                      Edit
                                  </MenuItem>
                                  <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDelete(currentId)}>
                                    <Iconify icon={'eva:trash-2-outline'} />
                                      Delete
                                  </MenuItem>
                                </>
                              }
                            />
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

export default PostsList