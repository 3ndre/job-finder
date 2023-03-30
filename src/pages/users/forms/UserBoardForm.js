import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// mui
import { Card, Grid, Typography, IconButton, InputAdornment, TextField, Button, Stack } from '@mui/material';

//mui date
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


//-----Component
import Iconify from '../../../components/Iconify';

//--------------------form-----------------------------------
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

//---------------------Dialog-------------------------------

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

//--------------------Redux---------------------------------
import { useDispatch } from 'react-redux';
import { createNewUser } from '../../../redux/features/apiSlice';


export default function UserBoardForm() {

  const dispatch = useDispatch();  
  const navigate = useNavigate(); 

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Creating...');


  //------------------------------form select state------------------------------
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(null);
  const [isOrganization, setIsOrganization] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  //Form data

  const [registerData, setRegisterData] = useState({ email: '', password: '', phone: '', address: ''});
  const [userData, setUserData] = useState({firstname: '', lastname: '', experience: '', salaryLow: '', salaryHigh: ''});
  const [orgData, setOrgData] = useState({orgname: '', totalemployee: '', avgsalary: '', url: ''});


  //------------------------------on Change form data------------------------------
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeDOB = (newValue) => {
    setDOB(newValue);
  };

  const handleChangeOrganization = () => {
    setIsOrganization(!isOrganization);
  }

  const handleChangeAvailability = () => {
    setIsAvailable(!isAvailable);
  }



  //---------------------------Create ------------------------------------

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {

      setOpen(true);

      if(isOrganization === true) {

      const createUserData = {
        //accountData
        email: registerData.email,
        password: registerData.password,
        status: "Pending",
        phone: registerData.phone,
        address: registerData.address,
        is_organization: isOrganization,
        is_staff: true,
        is_active: false,

        //organization
        "organization": {
          name: orgData.orgname,
          number_of_employees: Number(orgData.totalemployee),
          average_salary: orgData.avgsalary,
          logo: null,
          website: orgData.url,
      }

      }

      const result = await dispatch(createNewUser({createUserData})) //redux slice to createUser

      if(result.payload !== null && result.payload.status === 201) {

        setMessage('Created successfully!!')
        setRegisterData({ email: '', password: '', phone: '', address: ''});
        setUserData({firstname: '', lastname: '', experience: '', salaryLow: '', salaryHigh: ''});
        setOrgData({orgname: '', totalemployee: '', avgsalary: '', url: ''});
        setGender('');
        setDOB(null);
        setIsOrganization(false);
        setIsAvailable(false);
        setActiveStep(0);
        setTimeout(() => {
          setOpen(false)
          navigate('/user-board')
        }, 2000)


      } else {

        setRegisterData({ email: '', password: '', phone: '', address: ''});
        setUserData({firstname: '', lastname: '', experience: '', salaryLow: '', salaryHigh: ''});
        setOrgData({orgname: '', totalemployee: '', avgsalary: '', url: ''});
        setGender('');
        setDOB(null);
        setIsOrganization(false);
        setIsAvailable(false);
        setActiveStep(0);
        setOpen(false)
    }

    } else {
      const createUserData = {
        //accountData
        email: registerData.email,
        password: registerData.password,
        status: "Pending",
        phone: registerData.phone,
        address: registerData.address,
        is_organization: isOrganization,
        is_staff: false,
        is_active: false,

        //userData
        "detail": {
          first_name:  userData.firstname,
          last_name: userData.lastname,
          gender: gender,
          avatar: null,
          birth_date: dayjs(dob).format('YYYY-MM-DD'),
          experience: Number(userData.experience),
          expected_salary_low: userData.salaryLow,
          expected_salary_high: userData.salaryHigh,
          cv: null,
          is_available: isAvailable
        }
      }

      const result = await dispatch(createNewUser({createUserData})) //redux slice to createUser

      if(result.payload !== null && result.payload.status === 201) {

        setMessage('Created successfully!!')
        setRegisterData({ email: '', password: '', phone: '', address: ''});
        setUserData({firstname: '', lastname: '', experience: '', salaryLow: '', salaryHigh: ''});
        setOrgData({orgname: '', totalemployee: '', avgsalary: '', url: ''});
        setGender('');
        setDOB(null);
        setIsOrganization(false);
        setIsAvailable(false);
        setActiveStep(0);
        setTimeout(() => {
          setOpen(false)
          navigate('/user-board')
        }, 2000)


      } else {

        setRegisterData({ email: '', password: '', phone: '', address: ''});
        setUserData({firstname: '', lastname: '', experience: '', salaryLow: '', salaryHigh: ''});
        setOrgData({orgname: '', totalemployee: '', avgsalary: '', url: ''});
        setGender('');
        setDOB(null);
        setIsOrganization(false);
        setIsAvailable(false);
        setActiveStep(0);
        setOpen(false)
    }
    }


    } catch (e) {
      console.log(e);

    
      setRegisterData({ email: '', password: '', phone: '', address: ''});
      setUserData({firstname: '', lastname: '', experience: '', salaryLow: '', salaryHigh: ''});
      setOrgData({orgname: '', totalemployee: '', avgsalary: '', url: ''});
      setGender('');
      setDOB(null);
      setIsOrganization(false);
      setIsAvailable(false);
      setActiveStep(0);
    }


  }



  //steps

  const [activeStep, setActiveStep] = useState(0);


  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep(1);
  }

  const handleBackRegister = (e) => {
    e.preventDefault();
    setActiveStep(0);
  }



  //Stepper Form Content and Steps
  
function getStepContent(step) {

  // Event details form
  switch (step) {
    case 0:
      return (
        <>
        

    <form onSubmit={handleNext}>
      <Grid container spacing={3}>
        

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Grid container spacing={2} >

          <Grid item xs={12}>
            <TextField type="email" id="email" placeholder="Email" label="Email" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setRegisterData({...registerData, email: e.target.value})} value={registerData.email}/>
          </Grid>

          <Grid item xs={12}>
            <TextField type={showPassword ? 'text' : 'password'}  InputProps={{
                    endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
                </InputAdornment>
            ),}}
            id="password" placeholder="Password" label="Password" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setRegisterData({...registerData, password: e.target.value})} value={registerData.password}/>
          </Grid>

         
            
          <Grid item xs={6}>
              <TextField type="number" placeholder="Phone" label="Phone" variant="outlined" id="phone"  fullWidth  required autoComplete='off' onChange={e => setRegisterData({...registerData, phone: e.target.value})} value={registerData.phone}  />
          </Grid>

          <Grid item xs={6}>
              <TextField id="address" placeholder="Address" label="Address" variant="outlined" name="address" fullWidth  required autoComplete='off' onChange={e => setRegisterData({...registerData, address: e.target.value})} value={registerData.address}/>
          </Grid>
         

          <FormGroup sx={{mt: 2}}>
            <FormControlLabel control={<Switch checked={isOrganization} onChange={handleChangeOrganization}/>} sx={{justifyContent: 'left'}} labelPlacement="start" label={<Typography component="h4">Is it an organization?</Typography>} />
          </FormGroup>

          </Grid>
           
          </Card>
        </Grid>

        

        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
        
         
             <Typography variant="body1" sx={{ color: 'text.secondary', mt: 3, fontWeight: 'bold' }}>
             {registerData.email !== '' ? registerData.email : <>Email</>}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              {registerData.phone !== '' ? registerData.phone : <>Phone</>}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              {registerData.address !== '' ? registerData.address : <>Address</>}
              </Typography>
              
          </Card>

          <Stack spacing={3} mt={2}>
            <Button type="submit" variant="contained" size="large">
                Next
            </Button>
           </Stack>

        </Grid>
        
      </Grid>
    </form>
        </>
      );

      // NFT Token/Ticket details Form

    case 1:
      return (
        <>
         <form onSubmit={handleCreateUser}>
     
       <Grid container spacing={3}>
        

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>

          <Grid container spacing={2} >

          {isOrganization === false ? 

              <>
                   
                          <Grid item xs={6}>
                              <TextField placeholder="First Name" label="First Name" id="firstname" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setUserData({...userData, firstname: e.target.value})} value={userData.firstname}/>
                          </Grid>

                          <Grid item xs={6}>
                              <TextField placeholder="Last Name" label="Last Name" id="lastname" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setUserData({...userData, lastname: e.target.value})} value={userData.lastname}/>
                          </Grid>
                  
                          <Grid item xs={12}>
                            <FormControl fullWidth required >
                            <InputLabel >Gender</InputLabel>
                            <Select
                              value={gender}
                              label="Gender"
                              onChange={handleChangeGender}
                              autoComplete='off'
                            >
                              <MenuItem value={"MALE"}>Male</MenuItem>
                              <MenuItem value={"FEMALE"}>Female</MenuItem>
                              <MenuItem value={"OTHERS"}>Others</MenuItem>
                            </Select>
                          </FormControl>
                         </Grid>
                     
                        <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Date of birth"
                                    inputFormat="YYYY/MM/DD"
                                    value={dob}
                                    onChange={handleChangeDOB}
                                    renderInput={(params) => <TextField {...params} required fullWidth/>}
                                  />
                                </LocalizationProvider>
                      </Grid>

                      <Grid item xs={6}>
                          <TextField type="number" id="experience" InputProps={{endAdornment: <InputAdornment position="end">yr</InputAdornment>}}  placeholder="2" label="Experience" variant="outlined" fullWidth  required autoComplete='off' onChange={e => setUserData({...userData, experience: e.target.value})} value={userData.experience}/>
                      </Grid>

                      

                  

                  <Grid item xs={6}>
                      <TextField id="salaryLow" type="number" InputProps={{startAdornment: <InputAdornment position="start">Low</InputAdornment>}}  placeholder="10000" label="Expected Salary (L)" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setUserData({...userData, salaryLow: e.target.value})} value={userData.salaryLow}/>
                  </Grid>

                  <Grid item xs={6}>
                      <TextField id="salaryHigh" type="number" InputProps={{startAdornment: <InputAdornment position="start">High</InputAdornment>}}  placeholder="20000" label="Expected Salary (H)" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setUserData({...userData, salaryHigh: e.target.value})} value={userData.salaryHigh}/>
                  </Grid>
               

                  <FormGroup sx={{mt: 2}}>
                    <FormControlLabel control={<Switch checked={isAvailable} onChange={handleChangeAvailability}/>} sx={{justifyContent: 'left'}} labelPlacement="start" label={<Typography component="h4">Are you available?</Typography>} />
                  </FormGroup>
                </>

                : 
                
                <>
                <Grid item xs={12}>
                    <TextField placeholder="Organization Name" id='orgname' label="Organization Name" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setOrgData({...orgData, orgname: e.target.value})} value={orgData.orgname}/>
                </Grid>

                
                  
                <Grid item xs={6}>
                    <TextField id="totalemployee" type="number" placeholder="Total Employee" label="Total Employee" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setOrgData({...orgData, totalemployee: e.target.value})} value={orgData.totalemployee}/>
                </Grid>

                <Grid item xs={6}>
                    <TextField id="avgsalary" type="number" InputProps={{startAdornment: <InputAdornment position="start">रु</InputAdornment>,}} placeholder="Average Salary" label="Average Salary" variant="outlined" fullWidth  required autoComplete='off' onChange={e => setOrgData({...orgData, avgsalary: e.target.value})} value={orgData.avgsalary}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField id="url" type="url" placeholder="https://example.com" label="Website"  variant="outlined"  fullWidth required autoComplete='off' onChange={e => setOrgData({...orgData, url: e.target.value})} value={orgData.url}/>
                </Grid>
                </>
              }
                
                </Grid>
           
          </Card>
        </Grid>

        

        <Grid item xs={12} md={4}>

        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
        
         
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 3, fontWeight: 'bold' }}>
        {registerData.email !== '' ? registerData.email : <>Email</>}
         </Typography>

         <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
         {registerData.phone !== '' ? registerData.phone : <>Phone</>}
         </Typography>

         <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
         {registerData.address !== '' ? registerData.address : <>Address</>}
         </Typography>
         
     </Card>

          <Stack spacing={3} mt={2}>
            <Button type="submit" variant="contained" size="large">
                Create
            </Button>
           </Stack>

           <Stack spacing={3} mt={1}>
            <Button onClick={handleBackRegister} variant="outlined" size="large" startIcon={<Iconify icon="material-symbols:arrow-back-rounded"/>}>
                Back
            </Button>
           </Stack>

        </Grid>
        
      </Grid>
    </form>
        </>
      );


    default:
      return "unknown step";
  }
}



  return (
    <>
     <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {message === 'Created successfully!!' ? "Redirecting..." : "Creating (Do not close)"}
        </DialogTitle>
        <DialogContent sx={{mt:3}}>
          <DialogContentText id="alert-dialog-description">
          <List>
          <ListItem>
          <ListItemAvatar>
          {message === 'Created successfully!!' ? <Iconify icon={'fluent-emoji:party-popper'} width={50} height={50} /> : <CircularProgress color="success" /> }
          </ListItemAvatar>
          <ListItemText>{message}</ListItemText>
        </ListItem>
        </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>

    {getStepContent(activeStep)}
    </>
  );
}
