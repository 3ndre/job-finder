import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { Box, Stack, IconButton, InputAdornment, Button, Grid, TextField, CircularProgress, Typography, Card, CardContent } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

//mui date
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// components
import Iconify from '../../components/Iconify';

//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resendActivateUser } from '../../redux/features/apiSlice';




// ----------------------------------------------------------------------

const RegisterForm = () => {

  const dispatch = useDispatch();  
  const { regResponse, loading, resendResponse } = useSelector((state) => ({...state.api}));
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(true);


  //------------------------------form select state------------------------------
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(null);
  const [isOrganization, setIsOrganization] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  //------------------------------form state------------------------------
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

  //------------------------Registering user ---------------------------------------

  const handleRegisterUser = (e) => {
    e.preventDefault();

    try {

      if(isOrganization === true) {

      const createData = {
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

      dispatch(createUser({createData})) //redux slice to createUser

    } else {
      const createData = {
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

      dispatch(createUser({createData})) //redux slice to createUser
    }

     
      setRegisterData({ email: '', password: '', phone: '', address: ''});
      setUserData({firstname: '', lastname: '', experience: '', salaryLow: '', salaryHigh: ''});
      setOrgData({orgname: '', totalemployee: '', avgsalary: '', url: ''});
      setGender('');
      setDOB(null);
      setIsOrganization(false);
      setIsAvailable(false);
      setActiveStep(0);

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


  //-------------------Resend activation-----------------------------------------

  const handleResendActivation = (email) => {

    try {

      const resendData = {
        email: email
      }

      dispatch(resendActivateUser({resendData})) //redux slice to resend Activation

    } catch (e) {
      console.log(e);
    }
  }


  //Stepper Form Content and Steps

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep(1);
  }

  const handleBackRegister = (e) => {
    e.preventDefault();
    setActiveStep(0);
  }



function getStepContent(step) {

  // Event details form
  switch (step) {
    case 0:
      return (
        <>
        <form onSubmit={handleNext}>
      <Stack spacing={3}>

        {regResponse !== null && regResponse.status !== 201 ? 
        <Collapse in={open}>
          <Alert severity="error" onClose={() => {setOpen(false);}} sx={{ mb: 1 }}>
          Registration failed!
          </Alert>
        </Collapse>
        : null }


        <Grid>
            <TextField type="email" id="email" placeholder="Email" label="Email" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setRegisterData({...registerData, email: e.target.value})} value={registerData.email}/>
        </Grid>

        <Grid >
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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          
        <Grid>
            <TextField type="number" placeholder="Phone" label="Phone" variant="outlined" id="phone"  fullWidth  required autoComplete='off' onChange={e => setRegisterData({...registerData, phone: e.target.value})} value={registerData.phone}  />
        </Grid>

        <Grid>
            <TextField id="address" placeholder="Address" label="Address" variant="outlined" name="address" fullWidth  required autoComplete='off' onChange={e => setRegisterData({...registerData, address: e.target.value})} value={registerData.address}/>
        </Grid>
        </Stack>

        <FormGroup>
          <FormControlLabel control={<Switch checked={isOrganization} onChange={handleChangeOrganization}/>} sx={{justifyContent: 'left'}} labelPlacement="start" label={<Typography component="h4">Are you an organization?</Typography>} />
        </FormGroup>

        <Button fullWidth size="large" type="submit" variant="contained" >
          Next
        </Button>
      </Stack>
    </form>
        </>
      );

      // User and Organization Form

    case 1:
      return (
        <>
         <form onSubmit={handleRegisterUser}>
      <Stack spacing={3}>   

    {isOrganization === false ? 

      <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Grid >
                      <TextField placeholder="First Name" label="First Name" id="firstname" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setUserData({...userData, firstname: e.target.value})} value={userData.firstname}/>
                  </Grid>

                  <Grid >
                      <TextField placeholder="Last Name" label="Last Name" id="lastname" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setUserData({...userData, lastname: e.target.value})} value={userData.lastname}/>
                  </Grid>
            </Stack>

              <FormControl fullWidth required sx={{mb:1.5}}>
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

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Grid>
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

              <Grid>
                  <TextField type="number" id="experience" InputProps={{endAdornment: <InputAdornment position="end">yr</InputAdornment>}}  placeholder="2" label="Experience" variant="outlined" fullWidth  required autoComplete='off' onChange={e => setUserData({...userData, experience: e.target.value})} value={userData.experience}/>
              </Grid>

              </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

          <Grid>
              <TextField id="salaryLow" type="number" InputProps={{startAdornment: <InputAdornment position="start">Low</InputAdornment>}}  placeholder="10000" label="Expected Salary (L)" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setUserData({...userData, salaryLow: e.target.value})} value={userData.salaryLow}/>
          </Grid>

          <Grid>
              <TextField id="salaryHigh" type="number" InputProps={{startAdornment: <InputAdornment position="start">High</InputAdornment>}}  placeholder="20000" label="Expected Salary (H)" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setUserData({...userData, salaryHigh: e.target.value})} value={userData.salaryHigh}/>
          </Grid>
          </Stack>

          <FormGroup>
            <FormControlLabel control={<Switch checked={isAvailable} onChange={handleChangeAvailability}/>} sx={{justifyContent: 'left'}} labelPlacement="start" label={<Typography component="h4">Are you available?</Typography>} />
          </FormGroup>
        </>

        : 
        
        <>
        <Grid >
            <TextField placeholder="Organization Name" id='orgname' label="Organization Name" variant="outlined"  fullWidth required autoComplete='off' onChange={e => setOrgData({...orgData, orgname: e.target.value})} value={orgData.orgname}/>
        </Grid>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          
        <Grid>
            <TextField id="totalemployee" type="number" placeholder="Total Employee" label="Total Employee" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setOrgData({...orgData, totalemployee: e.target.value})} value={orgData.totalemployee}/>
        </Grid>

        <Grid>
            <TextField id="avgsalary" type="number" InputProps={{startAdornment: <InputAdornment position="start">रु</InputAdornment>,}} placeholder="Average Salary" label="Average Salary" variant="outlined" fullWidth  required autoComplete='off' onChange={e => setOrgData({...orgData, avgsalary: e.target.value})} value={orgData.avgsalary}/>
        </Grid>
        </Stack>

        <Grid >
            <TextField id="url" type="url" placeholder="https://example.com" label="Website"  variant="outlined"  fullWidth required autoComplete='off' onChange={e => setOrgData({...orgData, url: e.target.value})} value={orgData.url}/>
        </Grid>
        </>
}


        <Grid item xs={12} md={4}>
          <Stack spacing={3} mt={2}>
            <Button type="submit" variant="contained" size="large">
                Register
            </Button>
           </Stack>

           <Stack spacing={3} mt={1}>
            <Button onClick={handleBackRegister} variant="outlined" size="large" startIcon={<Iconify icon="material-symbols:arrow-back-rounded"/>}>
                Back
            </Button>
           </Stack>

        </Grid>

      </Stack>
    </form>
        </>
      );
    default:
      return "unknown step";
  }
}


  return (
   <>

   {regResponse !== null && regResponse.status === 201 ? 
   <>
    <Box >
          <Card>
            <CardContent>
            <Typography variant="h3" paragraph style={{display: 'flex', justifyContent: 'center'}}>
              Activate your account!
            </Typography>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}>
            An email has been sent to <span style={{ color: '#4338ca'}}>{regResponse.data.email}</span> containing an activation link. Please click on the link to activate your account.
            </Typography>
            <Typography variant="body2" align="center">
              Don’t have a link? &nbsp;
              {resendResponse !== null && resendResponse === 204 ? 
               <span style={{ color: '#4338ca', cursor: 'pointer', fontWeight: 'bold'}}>
                  Sent
                </span>
              : 
              <span style={{ color: '#4338ca', cursor: 'pointer', fontWeight: 'bold'}} onClick={() => handleResendActivation(regResponse.data.email)}>
                {loading === false ? <>Resend link</> : <>Sending...</>}
              </span>
              }
            </Typography>

            <Button  component={RouterLink} to="/login" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />} sx={{ mt: 2 }}>
              Log in
            </Button>

            </CardContent>
            </Card>
          </Box>
   </> 

   :

   <>

   {loading === false ? 

   <>
   {getStepContent(activeStep)}
   </>

   : 
    <>
    <Stack spacing={3} style={{alignItems: 'center'}}>
      <CircularProgress color="secondary" sx={{mt: 1}}/>
        <Typography color="text.secondary">Loading...</Typography>
    </Stack>
    </>}

    </>

    }

   </>
  );
}

export default RegisterForm;
