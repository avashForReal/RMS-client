// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Dashboard',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '/dashboard',
  },
];

export default menuConfig;
