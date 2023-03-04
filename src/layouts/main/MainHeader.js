import React, { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Stack } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
//
import MenuDesktop from './MenuDesktop';
import navConfig from './MenuConfig';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/features/apiSlice';
import AccountPopover from '../dashboarduser/header/AccountPopover';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  const dispatch = useDispatch();
 

  const fetchUser = () => {
    dispatch(getUser());
  }

  useEffect(() => {
    fetchUser();
}, []);

const { user } = useSelector((state) => ({...state.api}));
  

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'white', height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 } }} >
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo/>  

          <Box sx={{marginRight: 13}} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

          <Box sx={{ flexGrow: 1 }} />

          {localStorage.getItem('access_token') === null ? 
          <>
            <Button component={RouterLink} to="/login" startIcon={<Iconify icon={'tabler:login'} width={22} height={22} />}>Login</Button>
          </>
          :
          <>
            { user && (user[0]?.is_organization || user[0]?.is_staff) ?
            <Button variant="outlined" component={RouterLink} to="/dashboard" startIcon={<Iconify icon={'material-symbols:dashboard-rounded'} width={22} height={22} />}>Dashboard</Button>
            :
            <>
             <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
             <AccountPopover/>
            </Stack>
            </>
            }
          </>
          }
          

        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
