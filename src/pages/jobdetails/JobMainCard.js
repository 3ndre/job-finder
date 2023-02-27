import React  from 'react';
import { Card, Avatar, Typography, Button } from '@mui/material';


// ----------------------------------------------------------------------




export default function JobMainCard({data}) {

 

  return (

    <>

    <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>

      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Avatar alt="" sx={{ width: 64, height: 64, left: 0, right: 0}} src="https://via.placeholder.com/48"/>
      </div>


      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {data && data.author.name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        {data && data.location}
      </Typography>

     

        <Button variant="contained" sx={{mb: 3}}>
            Apply
        </Button>

    
    </Card>
    </>
  );
}
