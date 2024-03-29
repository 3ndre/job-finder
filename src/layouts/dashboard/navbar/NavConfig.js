// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------


const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <Iconify icon="material-symbols:dashboard-rounded"/> },
      { title: 'Job board', path: '/job-board', icon: <Iconify icon="material-symbols:list-alt"/> },
      { title: 'Organization board', path: '/org-board', icon: <Iconify icon="icons8:organization"/> },
      { title: 'User board', path: '/user-board', icon: <Iconify icon="mdi:users-group"/> },
    ],
  },

 
];

export default sidebarConfig;
