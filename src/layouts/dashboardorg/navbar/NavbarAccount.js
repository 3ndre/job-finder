import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {

  const { user, loading } = useSelector((state) => ({...state.api}));



  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Avatar src="/assets/avatar.png" alt="Avatar" />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" style={{textTransform: 'capitalize'}} noWrap>
            {loading === false ?
              <>{user.length > 0 ? <>{user[0].email.split('.')[0]}</> : null}</>
              :
              <>Loading...</>}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            user
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}