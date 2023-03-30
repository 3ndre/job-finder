import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersCreated, deleteUserById } from '../../redux/features/apiSlice';
import Scrollbar from '../../components/Scrollbar';
import SkeletonItem from '../../components/SkeletonItem';
import EmptyContent from '../../components/EmptyContent';
import TableMoreMenu from '../../components/TableMoreMenu';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';


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






const UsersList = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { loading, allUsers } = useSelector((state) => ({...state.api}));
    

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
    dispatch(getAllUsersCreated());
  }

  const handleDelete = (id) => {
    
    dispatch(deleteUserById({id: id}))
    .then(() => {
      // Fetch the updated user lists
      dispatch(getAllUsersCreated());
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
      {allUsers.length < 1 ? 
                      
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
                            Email
                        </TableCell>

                        <TableCell align="left">
                            Status
                        </TableCell>

                        <TableCell align="left">
                            Type
                        </TableCell>
                       
                        <TableCell></TableCell>
                    </TableRow>

                </TableHead>

                <TableBody>

                        {allUsers && allUsers.length > 0 && allUsers[0] && allUsers[0].results.map((item) => (

                        <TableRow hover key={item.id}>

                        <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {item.email}
                                </Typography>
                              </TableCell>

                    
                              <TableCell align="left">
                                <Typography variant="subtitle2" noWrap >
                                    {item.status}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                <Label color={`${item.is_organization === true ? 'secondary' : item.is_staff === true ? 'info' : 'success'}`}>
                                  {item.is_organization ? 'Organization' : item.is_staff ? 'Staff' : 'User'}
                                </Label>
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

export default UsersList