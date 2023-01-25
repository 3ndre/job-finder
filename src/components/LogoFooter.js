import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

LogoFooter.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function LogoFooter({ disabledLink = false, sx }) {
  

  const logo = (
   
      
      
    <Box >
    <h3>Job Finder</h3>
 </Box>
     
    
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/" style={{textDecoration: 'none', color: 'black', opacity: 0.8}}>{logo}</RouterLink>;
}
