// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'users',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
        ],
      },
      // department
      {
        title: 'department',
        path: PATH_DASHBOARD.department.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.department.list },
          { title: 'create', path: PATH_DASHBOARD.department.new },
        ],
      },
      // subject
      {
        title: 'subject',
        path: PATH_DASHBOARD.subject.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.subject.list },
          { title: 'create', path: PATH_DASHBOARD.subject.new },
        ],
      },
       // subject
       {
        title: 'rooms',
        path: PATH_DASHBOARD.rooms.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.rooms.list },
          { title: 'create', path: PATH_DASHBOARD.rooms.new },
        ],
      },
      {
        title: 'teacher',
        path: PATH_DASHBOARD.teachers.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.teachers.list },
          { title: 'create', path: PATH_DASHBOARD.teachers.new },
        ],
      },
    ],
  },
];

export default navConfig;
