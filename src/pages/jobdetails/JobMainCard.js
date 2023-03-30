import React  from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Typography, Button } from '@mui/material';


// ----------------------------------------------------------------------




export default function JobMainCard({data, id}) {


  return (

    <>

    <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>

      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Avatar alt="" sx={{ width: 64, height: 64, left: 0, right: 0}} src={data && `${process.env.REACT_APP_API_URL}${data.author.avatar}`}/>
      </div>


      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {data && data.author.name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        {data && data.location}
      </Typography>

    

        {localStorage.getItem('access_token') === null ? 
          <>
          <Button variant="contained" sx={{mb: 3}} component={RouterLink} to="/login" >
              Login to Apply
          </Button>
          </>
          :
          <>
          <Button variant="contained" sx={{mb: 3}} component={RouterLink} to={`/job/${id}/apply`}>
            Apply
          </Button>
          </>
          }

    
    </Card>
    </>
  );
}
