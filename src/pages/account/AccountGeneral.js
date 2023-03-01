
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


// @mui
import { Grid, Card, Stack, Avatar, Button, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


//--------------------Redux---------------------------------
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/features/apiSlice';

// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//--------------------------------------------------------------------

export default function AccountGeneral({data}) {

  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const [userData, setUserData] = useState({ email: data.email, phone: data.phone, address: data.address});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleUpdateUser = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const updateUserData = {
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
      }

      const result = await dispatch(updateUser({ updateUserData }));
      
      if(result.payload !== null && result.payload.status === 200) {

        setOpen(true);
        setLoading(false);
        setTimeout(() => {
          navigate('/settings')
        }, 2000)


      } else {
        setLoading(false)
      }
    
    } catch (e) {

      console.log(e)
      setLoading(false)
      
    }
  }

  
  return (
    <>

    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: 'white' }}>
          Updated successfully!
        </Alert>
      </Snackbar>
    </Stack>
    
    
    
  
    <form onSubmit={handleUpdateUser}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 8, px: 3, textAlign: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Avatar src="https://www.gstatic.com/stadia/gamers/avatars/xxhdpi/avatar_53.png" style={{height: '100px', width: '100px', borderStyle: 'dotted', borderColor: 'gray' }}/>
            </div>

             <br></br>
             <div>
            <Button component="label" style={{alignItems: 'center', color: 'white', background: '#3f51b5'}}>
                     &nbsp;Change
                        <input accept="image/*" hidden type="file"  />
            </Button>
              </div>
          </Card>

        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Grid container spacing={2} >

      
            <Grid item xs={12}>
                <TextField placeholder="Email" label="Email" variant="outlined" fullWidth required autoComplete='off' onChange={e => setUserData({...userData, email: e.target.value})} value={userData.email} />
            </Grid>

            <Grid item xs={12}>
                  <TextField type="number" name="phone"  placeholder="Phone Number"  label="Phone Number" variant="outlined" fullWidth autoComplete='off' onChange={e => setUserData({...userData, phone: e.target.value})} value={userData.phone}/>
            </Grid>

            <Grid item xs={12}>
                  <TextField placeholder="Address" name="address"  label="Address" variant="outlined" fullWidth autoComplete='off' onChange={e => setUserData({...userData, address: e.target.value})} value={userData.address}/>
            </Grid>     

            </Grid>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              
            {loading === true ? 
            <>
            <Button disabled variant="contained">
              Updating...
            </Button>
            </>
            :
            <>
            <Button type="submit" variant="contained">
                 Update
            </Button>
            </>
            }
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
    </>
  );
}
