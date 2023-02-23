import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// mui
import { Card, Grid, Typography, TextField, Button, Stack, InputAdornment } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

//-----Component
import Iconify from '../../../components/Iconify';

//--------------------Redux---------------------------------
import { useDispatch } from 'react-redux';
import { updateJob } from '../../../redux/features/apiSlice';



export default function JobBoardUpdateForm({data, id}) {


     const dispatch = useDispatch(); 
     const navigate = useNavigate(); 


     //------------------------------form state------------------------------
     const [jobData, setJobData] = useState({ title: data[0].title, description: data[0].description, position: data[0].position, location: data[0].location, salaryLow: data[0].salary_low, salaryHigh: data[0].salary_high, timeLow: data[0].time_low, timeHigh: data[0].time_high});
     const [lodging, setLodging] = useState(data[0].lodging);

     const [open, setOpen] = useState(false);
     const [message, setMessage] = useState('Updating...');


     // -----------------------On change form data -----------------------------

     const handleChangeLodging = () => {
        setLodging(!lodging);
      }


      const handleUpdateJob = async (e) => {
        e.preventDefault();
        
        try {

          setOpen(true);

            const updateJobData = {
                title: jobData.title,
                position: jobData.position,
                location: jobData.location,
                time_low: Number(jobData.timeLow),
                time_high: Number(jobData.timeHigh),
                salary_low: jobData.salaryLow,
                salary_high: jobData.salaryHigh,
                description: jobData.description,
                lodging: lodging,
                field: 1  
            }


            const result = await dispatch(updateJob({ updateJobData, id })) //redux slice to createUser
            


            if(result.payload !== null && result.payload.status === 200) {

              setMessage('Updated successfully!!')
              setJobData({ title: '', description: '', position: '', location: '', salaryLow: '', salaryHigh: '', timeLow: '', timeHigh: '' });
              setLodging(false);
              setTimeout(() => {
                setOpen(false)
                navigate('/job-board')
              }, 2000)
  

            } else {

              setOpen(false)
          }

        } catch (e) {
            console.log(e)
            setOpen(false)
        }
      }




  return (
    <>


  <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {message === 'Updated successfully!!' ? "Redirecting..." : "Updating (Do not close)"}
        </DialogTitle>
        <DialogContent sx={{mt:3}}>
          <DialogContentText id="alert-dialog-description">
          <List>
          <ListItem>
          <ListItemAvatar>
          {message === 'Updated successfully!!' ? <Iconify icon={'fluent-emoji:party-popper'} width={50} height={50} /> : <CircularProgress color="success" /> }
          </ListItemAvatar>
          <ListItemText>{message}</ListItemText>
        </ListItem>
        </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>


    <form onSubmit={handleUpdateJob}>
      <Grid container spacing={3}>
        

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Grid container spacing={2} >
              <Grid item xs={12} >
                  <TextField placeholder="Looking for a General Manager" id="title" label="Title" variant="outlined" fullWidth required autoComplete='off' onChange={e => setJobData({...jobData, title: e.target.value})} value={jobData.title}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Description" id="description" multiline rows={3} placeholder="This job requires..." variant="outlined" fullWidth required autoComplete='off' onChange={e => setJobData({...jobData, description: e.target.value})} value={jobData.description}/>
                </Grid>


                <Grid item xs={6} >
                  <TextField placeholder="General Manager" id="postition" label="Position" variant="outlined" fullWidth required autoComplete='off' onChange={e => setJobData({...jobData, position: e.target.value})} value={jobData.position}/>
                </Grid>

                <Grid item xs={6} >
                  <TextField placeholder="Kathmandu" id="location" label="Location" variant="outlined" fullWidth required autoComplete='off' onChange={e => setJobData({...jobData, location: e.target.value})} value={jobData.location}/>
                </Grid>


                <Grid item xs={6}>
                    <TextField id="salaryLow" type="number" InputProps={{startAdornment: <InputAdornment position="start">Low</InputAdornment>}}  placeholder="10000" label="Salary" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setJobData({...jobData, salaryLow: e.target.value})} value={jobData.salaryLow}/>
                </Grid>

                <Grid item xs={6}>
                    <TextField id="salaryHigh" type="number" InputProps={{startAdornment: <InputAdornment position="start">High</InputAdornment>}}  placeholder="20000" label="Salary" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setJobData({...jobData, salaryHigh: e.target.value})} value={jobData.salaryHigh}/>
                </Grid>
              


                <Grid item xs={6}>
                    <TextField id="timeLow" type="number" InputProps={{startAdornment: <InputAdornment position="start">From</InputAdornment>}}  placeholder="10" label="Time" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setJobData({...jobData, timeLow: e.target.value})} value={jobData.timeLow}/>
                </Grid>

                <Grid item xs={6}>
                    <TextField id="timeHigh" type="number" InputProps={{startAdornment: <InputAdornment position="start">To</InputAdornment>}}  placeholder="20" label="Time" variant="outlined"  fullWidth  required autoComplete='off' onChange={e => setJobData({...jobData, timeHigh: e.target.value})} value={jobData.timeHigh}/>
                </Grid>
                

                <FormGroup>
                    <FormControlLabel control={<Switch checked={lodging} onChange={handleChangeLodging}/>} sx={{justifyContent: 'left', mt: 2}} labelPlacement="start" label={<Typography component="h4">Lodging included?</Typography>} />
                </FormGroup>

                </Grid>
           
          </Card>
        </Grid>



                <Grid item xs={12} md={4}>
                <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>

                
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 3, fontWeight: 'bold' }}>
                        {jobData.title === '' ? 'Job Title' : jobData.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                        {jobData.description === '' ? 'Job Description' : jobData.description}
                    </Typography>
                    
                </Card>

                <Stack spacing={3} mt={2}>
                    <Button type="submit" variant="contained" size="large">
                        Update
                    </Button>
                </Stack>

                </Grid>
        
      </Grid>
    </form>
    </>
  );
}
