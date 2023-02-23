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
import { useDispatch, useSelector } from 'react-redux';
import { createJob } from '../../../redux/features/apiSlice';



export default function JobBoardForm() {


     const dispatch = useDispatch(); 
     const navigate = useNavigate(); 
     const { user } = useSelector((state) => ({...state.api}));


     //------------------------------form state------------------------------
     const [jobData, setJobData] = useState({ title: '', description: '', position: '', location: '', salaryLow: '', salaryHigh: '', timeLow: '', timeHigh: '' });
     const [lodging, setLodging] = useState(false);

     const [open, setOpen] = useState(false);
     const [message, setMessage] = useState('Posting...');


     // -----------------------On change form data -----------------------------

     const handleChangeLodging = () => {
        setLodging(!lodging);
      }


      const handleCreateJob = async (e) => {
        e.preventDefault();
        
        try {

          setOpen(true);

            const createJobData = {
                title: jobData.title,
                position: jobData.position,
                location: jobData.location,
                time_low: Number(jobData.timeLow),
                time_high: Number(jobData.timeHigh),
                salary_low: jobData.salaryLow,
                salary_high: jobData.salaryHigh,
                description: jobData.description,
                lodging: lodging,
                field: 1,
                author: user[0].id
            }


            const result = await dispatch(createJob({ createJobData })) //redux slice to createUser


            if(result.payload !== null && result.payload.status === 201) {

              setMessage('Posted successfully!!')
              setJobData({ title: '', description: '', position: '', location: '', salaryLow: '', salaryHigh: '', timeLow: '', timeHigh: '' });
              setLodging(false);
              setTimeout(() => {
                setOpen(false)
                navigate('/job-board')
              }, 2000)
  

            } else {

              setJobData({ title: '', description: '', position: '', location: '', salaryLow: '', salaryHigh: '', timeLow: '', timeHigh: '' });
              setLodging(false);
              setOpen(false)
          }

        } catch (e) {
            console.log(e)
            setJobData({ title: '', description: '', position: '', location: '', salaryLow: '', salaryHigh: '', timeLow: '', timeHigh: '' });
            setLodging(false);
            setOpen(false)
        }
      }



  return (
    <>


  <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {message === 'Posted successfully!!' ? "Redirecting..." : "Posting (Do not close)"}
        </DialogTitle>
        <DialogContent sx={{mt:3}}>
          <DialogContentText id="alert-dialog-description">
          <List>
          <ListItem>
          <ListItemAvatar>
          {message === 'Posted successfully!!' ? <Iconify icon={'fluent-emoji:party-popper'} width={50} height={50} /> : <CircularProgress color="success" /> }
          </ListItemAvatar>
          <ListItemText>{message}</ListItemText>
        </ListItem>
        </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>


    <form onSubmit={handleCreateJob}>
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
                        Create
                    </Button>
                </Stack>

                </Grid>
        
      </Grid>
    </form>
    </>
  );
}
