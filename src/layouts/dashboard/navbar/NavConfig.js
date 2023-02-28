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
      { title: 'Organization board', path: '/org-board', icon: <Iconify icon="ri:building-4-fill"/> },
    ],
  },

 
];

export default sidebarConfig;
