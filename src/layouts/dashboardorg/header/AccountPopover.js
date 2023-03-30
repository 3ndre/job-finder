import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [

  {
    label: 'Profile',
    linkTo: '/dashboard',
  },
  {
    label: 'Settings',
    linkTo: '/settings',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const { user, loading } = useSelector((state) => ({...state.api}));

  function disconnected () {
    localStorage.clear();
    localStorage.removeItem('user_data');
    navigate('/login');
    window.location.reload();
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src="/assets/avatar.png" alt="Avatar" />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {loading === false ?
            <>{user.length > 0 ? <>{user[0].email}</> : null}</>
            :
            <>Loading...</>}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {loading === false ?
              <>{user.length > 0 ? <>{user[0].email}</> : null}</>
              :
              <>Loading...</>}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem component={RouterLink} key={option.label} to={option.linkTo} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }} onClick={disconnected}>Logout</MenuItem>
      </MenuPopover>
    </>
  );
}
