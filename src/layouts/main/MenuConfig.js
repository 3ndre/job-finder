
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  
  {
    title: 'Organization',
    icon: <Iconify icon={'codicon:organization'} {...ICON_SIZE} />,
    children: [
      {
        subheader: '',
        items: [
          { title: 'Hire Staff', icon: <Iconify icon={'fluent-mdl2:recruitment-management'} {...ICON_SIZE} />, path: '/hire' },
          { title: 'Top Staff', icon: <Iconify icon={'icon-park-outline:file-staff'} {...ICON_SIZE} />, path: '/top' },
          { title: 'Admission', icon: <Iconify icon={'material-symbols:other-admission'} {...ICON_SIZE} />, path: '/admission' },
        ],
      },
    ],
  },
  {
    title: 'Individual',
    icon: <Iconify icon={'material-symbols:person'} {...ICON_SIZE} />,
    children: [
      {
        subheader: '',
        items: [
          { title: 'Student Services', icon: <Iconify icon={'mdi:account-student-outline'} {...ICON_SIZE} />, path: '/student' },
          { title: 'Find Jobs', icon: <Iconify icon={'material-symbols:find-in-page-outline'} {...ICON_SIZE} />, path: '/jobs' },
        ],
      },
    ],
  },
  {
    title: 'About Us',
    icon: <Iconify icon={'codicon:organization'} {...ICON_SIZE} />,
    children: [
      {
        subheader: '',
        items: [
          { title: 'Company', icon: <Iconify icon={'fluent-mdl2:recruitment-management'} {...ICON_SIZE} />, path: '/company' },
          { title: 'Contact', icon: <Iconify icon={'icon-park-outline:file-staff'} {...ICON_SIZE} />, path: '/contact' },
        ],
      },
    ],
  },
];

export default menuConfig;
