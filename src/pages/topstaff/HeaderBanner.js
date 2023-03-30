import React from 'react';
import { m } from 'framer-motion';

//--------------------Redux---------------------------------


// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, IconButton, Typography } from '@mui/material';


// components
import { MotionViewport, varFade } from '../../components/animate';
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



export default function HeaderBanner() {


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
            mb: 8,
            mt: 4
          }}
        >

            <m.div variants={varFade().inUp} style={{display: 'flex', justifyContent: 'center'}} >
            <Typography variant="h2" sx={{color: 'white'}}> 
              🏆 Top Staff
            </Typography>
            </m.div>
           
           </Box>


        

      

      </Container>
    </RootStyle>
  );
}


