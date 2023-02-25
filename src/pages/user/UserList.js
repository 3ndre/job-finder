import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByOrg, deleteUser } from '../../redux/features/apiSlice';
import Scrollbar from '../../components/Scrollbar';
import SkeletonItem from '../../components/SkeletonItem';
import EmptyContent from '../../components/EmptyContent';
import TableMoreMenu from '../../components/TableMoreMenu';
import Iconify from '../../components/Iconify';



//MUI
import {
  Card,
  MenuItem,
  Typography,
  Table,
  Divider,
  TableBody,
  TableContainer,
  TableRow, TableCell, TableHead,  
} from '@mui/material';






const UserList = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { loading, orgUser } = useSelector((state) => ({...state.api}));
    

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

  const fetchUser = () => {
    dispatch(getUserByOrg());
  }

  const handleDelete = (id) => {
    
    dispatch(deleteUser({id: id}))
    .then(() => {
      // Fetch the updated job list
      dispatch(getUserByOrg());
    });
    setOpenMenuActions(null);

  }


  const handleNavigate = (id) => {

    navigate(`/user-board/update/${id}`)
   window.location.reload();

}


  useEffect(() => {
    fetchUser()
}, []);



  return (
    <>


    
    {loading ? (<SkeletonItem/>) : (

      <>    
      {orgUser.length < 1 ? 
                      
        <EmptyContent
        title="Empty!"
        description={`You don't have any users yet.`}
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

                        <TableCell align="left">
                            Description
                        </TableCell>

                        <TableCell align="left">
                            Average salary
                        </TableCell>
                       
                        <TableCell></TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>

                        {orgUser && orgUser.length > 0 && orgUser[0] && orgUser[0].results.map((item) => (

                        <TableRow hover key={item.id}>

                        <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.name}
                                </Typography>
                              </TableCell>

                    
                              <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.description}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.average_salary}
                                </Typography>
                              </TableCell>

        
                         
                          <TableCell align="right" onClick={() => {setCurrentId(item.id);}}>
                            <TableMoreMenu open={openMenu} onOpen={handleOpenMenu} onClose={handleCloseMenu}
                              actions={
                                <>
                                  <MenuItem onClick={() => handleNavigate(currentId)}>
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

export default UserList