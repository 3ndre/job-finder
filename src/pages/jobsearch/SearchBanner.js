import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';

//--------------------Redux---------------------------------
import { useDispatch } from 'react-redux';
import { getJobSearch } from '../../redux/features/apiSlice';

// @mui
import { styled } from '@mui/material/styles';
import { Box,  Container, Button, Tooltip, TextField, Collapse, Card, CardContent, CardActions, IconButton, InputAdornment} from '@mui/material';

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
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  

  const [searchData, setSearchData] = useState({ title: ''});

  //-------------- triggering state change-----------------
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };
  

  const handleNavigate = (e) => {
    e.preventDefault();
    dispatch(getJobSearch(searchData.title));
    navigate(`/search/${searchData.title}`);
    setSearchData({ title: ''});
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
                <FormControl fullWidth sx={{mb:1.5}}>
                  <InputLabel >Level</InputLabel>
                  <Select
                    value={level}
                    label="Level"
                    onChange={handleChangeLevel}
                    autoComplete='off'
                  >
                    <MenuItem value={10}>Primary</MenuItem>
                    <MenuItem value={20}>Secondary</MenuItem>
                    <MenuItem value={30}>Higher</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{mb:1.5}}>
                  <InputLabel >Subject</InputLabel>
                  <Select
                    value={subject}
                    label="Subject"
                    onChange={handleChangeSubject}
                    autoComplete='off'
                  >
                    <MenuItem value={10}>Science</MenuItem>
                    <MenuItem value={20}>Math</MenuItem>
                    <MenuItem value={30}>English</MenuItem>
                  </Select>
                </FormControl>

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


