import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';

//--------------------Redux---------------------------------
import { useDispatch } from 'react-redux';
import { getJobSearch } from '../../redux/features/apiSlice';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Button, Tooltip, TextField, Collapse, Card, CardContent, CardActions, IconButton, InputAdornment} from '@mui/material';

//form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// components
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from '../../components/Iconify';
import '../home/home.css'


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(15),
    backgroundColor: '#4338ca',
    paddingBottom: theme.spacing(3),
  }));

//-----------Filter expand more--------------------------------
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginRight: 'auto',
    marginLeft: '10px',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



export default function SearchBanner() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //--------------states------------------------
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState('');
  
  const [searchData, setSearchData] = useState({ title: '', location: '', salaryLow: '', salaryHigh: ''});

  //-------------- triggering state change-----------------
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangePosition = (event) => {
    setPosition(event.target.value);
  };

  

  const handleNavigate = (e) => {
    e.preventDefault();
   
    let searchApiData = '';

      if (searchData.title) {
        searchApiData += `&title=${searchData.title}`;
      }

      if (searchData.position) {
        searchApiData += `&position=${searchData.position}`;
      }

      if (searchData.salaryLow) {
        searchApiData += `&salary_low=${Number(searchData.salaryLow)}`;
      }

      if (searchData.salaryHigh) {
        searchApiData += `&salary_high=${Number(searchData.salaryHigh)}`;
      }

      if (position) {
        searchApiData += `&position=${position}`;
      }

      // Remove the leading '&' character
      searchApiData = searchApiData.substring(1);

      dispatch(getJobSearch(searchApiData));
      navigate(`/search?${searchApiData}`);
      setSearchData({ title: '', location: '', salaryLow: '', salaryHigh: ''});
      setPosition('');
    
}


  return (
    <RootStyle>

          <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>

      <Container component={MotionViewport}>

        <Box
          sx={{
            textAlign: 'center',
            mb: 10,
            mt: 4
          }}
        >
        <form onSubmit={handleNavigate}>
            <m.div variants={varFade().inUp} style={{display: 'flex', justifyContent: 'center'}} >
            <Card sx={{ maxWidth: 500, width: '100%' }}>
              <CardContent>
              <TextField InputProps={{endAdornment: <InputAdornment position="start"><Iconify icon="material-symbols:search" /></InputAdornment>}} label="Search Job" variant="outlined" autoComplete='off' sx={{ width: '100%' }} onChange={e => setSearchData({...searchData, title: e.target.value})} value={searchData.title}/>
              </CardContent>
              <CardActions disableSpacing>
              <Tooltip title="Filter" placement="bottom">
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="filter list"
                >
                  <Iconify icon="mdi:mixer-settings-vertical" color="#4338ca" />
                </ExpandMore>          
              </Tooltip>
                {expanded !== true ?
                <Button type="submit" variant="contained" disabled={searchData.title === '' ? true : false} style={{marginRight: '10px'}}>Search</Button>
                : null}
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <FormControl fullWidth sx={{mb:1.5, textAlign: 'left'}}>
                  <InputLabel >Position</InputLabel>
                  <Select
                    value={position}
                    label="Position"
                    onChange={handleChangePosition}
                    autoComplete='off'
                  >
                    <MenuItem value={'Intern'}>Intern</MenuItem>
                    <MenuItem value={'Volunteer'}>Volunteer</MenuItem>
                    <MenuItem value={'Senior'}>Senior Level</MenuItem>
                    <MenuItem value={'Mid'}>Mid Level</MenuItem>
                    <MenuItem value={'Junior'}>Junior Level</MenuItem>
                    <MenuItem value={'Trainee'}>Traniee</MenuItem>
                  </Select>
                </FormControl>

                <Grid container spacing={2} sx={{mb:1.5}}>
                <Grid item xs={6}>
                    <TextField id="salaryLow" type="number" InputProps={{startAdornment: <InputAdornment position="start">Low</InputAdornment>}}  placeholder="10000" label="Salary" variant="outlined"  fullWidth  autoComplete='off' onChange={e => setSearchData({...searchData, salaryLow: e.target.value})} value={searchData.salaryLow}/>
                </Grid>

                <Grid item xs={6}>
                    <TextField id="salaryHigh" type="number" InputProps={{startAdornment: <InputAdornment position="start">High</InputAdornment>}}  placeholder="40000" label="Salary" variant="outlined"  fullWidth  autoComplete='off' onChange={e => setSearchData({...searchData, salaryHigh: e.target.value})} value={searchData.salaryHigh}/>
                </Grid>
                </Grid>
              

                <Grid item xs={6}>
                    <TextField id="location" placeholder="Kathmandu" label="Location" variant="outlined"  fullWidth  autoComplete='off' onChange={e => setSearchData({...searchData, location: e.target.value})} value={searchData.location}/>
                </Grid>

                </CardContent>
                <CardActions disableSpacing>
                {expanded === true ?
                <Button type="submit" variant="contained" disabled={searchData.title === '' ? true : false} style={{marginRight: '10px', marginLeft: 'auto'}}>Search</Button>
                : null}
              </CardActions>
              </Collapse>
            </Card>


            </m.div>
           
          </form>
        </Box>


        

      

      </Container>
    </RootStyle>
  );
}


