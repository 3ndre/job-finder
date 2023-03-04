import React, {useState} from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { MaterialEditor } from "react-mui-editor";

//components
import Iconify from '../../components/Iconify';

// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card,  Stack, Button, TextField, Typography } from '@mui/material';

//form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
import { createJobApply } from '../../redux/features/apiSlice';


// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  }));
  


// ----------------------------------------------------------------------

export default function JobApplyForm({cv, job, id}) {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [cvData, setCvData] = useState('');
  const [formData, setFormData] = useState({phone: '', referId: ''});
  const [coverLetter, setCoverLetter] = useState('');

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Applying...');

  const handleChangeCV = (event) => {
    setCvData(event.target.value);
  };


  // get user ID by CV
  function getUserById(id, arr) {
    for (let obj of arr) {
      if (obj.id === id) {
        return obj.user;
      }
    }
    return null;
  }

  const handleApply = async (e) => {

    e.preventDefault();

    try {

      setOpen(true);

      const userId = getUserById(cvData, cv);

      const jobData = {
        post: Number(id),
        cv: cvData,
        user_id: userId,
        phone: formData.phone,
        refer_id: formData.referId,
        cover_letter: coverLetter
      }

      const result = await dispatch(createJobApply({ jobData }));

      console.log(result)

      if(result.payload !== null && result.payload.status === 201) {

        setMessage('Applied successfully!!')
        setFormData({ phone: '', referId: '' });
        setCoverLetter('');
        setCvData('');
       
        setTimeout(() => {
          setOpen(false)
          navigate(`/job/${id}`)
        }, 2000)


      } else {

        setFormData({ phone: '', referId: '' });
        setCoverLetter('');
        setCvData('');
        setOpen(false)
    }

  

    } catch (e) {
      console.log(e)
      setFormData({ phone: '', referId: '' });
      setCoverLetter('');
      setCvData('');
      setOpen(false)
    }

  }


  return (
    <>

    <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {message === 'Applied successfully!!' ? "Redirecting..." : "Applying (Do not close)"}
        </DialogTitle>
        <DialogContent sx={{mt:3}}>
          <DialogContentText id="alert-dialog-description">
          <List>
          <ListItem>
          <ListItemAvatar>
          {message === 'Applied successfully!!' ? <Iconify icon={'fluent-emoji:party-popper'} width={50} height={50} /> : <CircularProgress color="success" /> }
          </ListItemAvatar>
          <ListItemText>{message}</ListItemText>
        </ListItem>
        </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>


      <form onSubmit={handleApply}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>

                <div>
                <LabelStyle>Cover letter</LabelStyle>
                  <MaterialEditor
                  editorContent={coverLetter}
                  setEditorContent={setCoverLetter}
                  placeholder="Write a cover letter..." 
                  toolbarConfig={[ 'typographyDropdown', 'bold', 'italic', 'underline', 'unorderedList', 'orderedList', 'blockquote']} />
              </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>

                <Grid item xs={12}>
                {cv && cv.length < 1 ? 
                <>
                 <Button component={RouterLink} variant="outlined" fullWidth size="large" to="/cv">Upload CV</Button>
                </>
                :
                <>
                <FormControl fullWidth sx={{textAlign: 'left'}}>
                  <InputLabel >CV</InputLabel>
                  <Select value={cvData} label="CV" autoComplete='off' onChange={handleChangeCV}>
                    {cv && cv[0] && cv.map(item => (
                    <MenuItem value={item.id} key={item.id}>{item.name.split('.').slice(0, -1).join('.')}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </>}
                </Grid>

              <Grid item xs={12} >
              <TextField type="number" placeholder="Phone number" id="number" label="Phone number" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, phone: e.target.value})} value={formData.phone}/>
              </Grid>

              <Grid item xs={12} >
              <TextField placeholder="Refer ID" id="refer_id" label="Refer ID" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, referId: e.target.value})} value={formData.referId}/>
              </Grid>

              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button fullWidth type="submit" variant="contained" size="large">
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
