import { Box, Card, Typography, Button} from '@mui/material';


// components
import Image from '../../components/Image';

export default function AdmissionCard() {



  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Image src='https://cdn.dribbble.com/users/210795/screenshots/16073734/media/cab58d1106fe8b9e903ea49676e3133f.png' alt="" ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 2 }} style={{textTransform: 'capitalize'}}>
        XY Barding School
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        Admission Open 
      </Typography>

      <Button variant="outlined" sx={{ mb: 3 }}>Apply</Button>

      
    </Card>
  );
}
