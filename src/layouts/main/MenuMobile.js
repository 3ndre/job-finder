import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Paper } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

//bottom nvigation
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


// ----------------------------------------------------------------------

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};

const ICON_SIZE = {
  width: 22,
  height: 22,
};

//Navigation data
const navConfig = [
  {
    id: 1,
    title: 'Home',
    icon: <Iconify icon={'material-symbols:home-outline-rounded'} {...ICON_SIZE} />,
    path: '/'
  },
  {
    id: 2,
    title: 'Hire Staff',
    icon: <Iconify icon={'fluent-mdl2:recruitment-management'} {...ICON_SIZE} />,
    path: '/topstaff'
  },
  {
    id: 3,
    title: 'Student',
    icon: <Iconify icon={'mdi:account-student-outline'} {...ICON_SIZE} />,
    path: '/recents'
  },
  {
    id: 3,
    title: 'Admission',
    icon: <Iconify icon={'material-symbols:other-admission-outline'} {...ICON_SIZE} />,
    path: '/admission'
  },
];


export default function MenuMobile() {

  return (
    <>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, }} elevation={4} style={{ zIndex: 1251 }}>
      <BottomNavigation showLabels>
      {navConfig.map((item) => (
       <BottomNavigationAction
              sx={{
                '&.active': {
                  color: 'primary.main',
                  fontWeight: 'fontWeightMedium',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                },
              }}
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              component={RouterLink}
              label={item.title}
              icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
    </>
  );
}