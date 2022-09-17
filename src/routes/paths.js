// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  department: {
    root: path(ROOTS_DASHBOARD, '/department'),
    new: path(ROOTS_DASHBOARD, '/department/new'),
    list: path(ROOTS_DASHBOARD, '/department/list'),
    edit: (dept) => path(ROOTS_DASHBOARD, `/department/${dept}/edit`),
  },
  subject: {
    root: path(ROOTS_DASHBOARD, '/subject'),
    new: path(ROOTS_DASHBOARD, '/subject/new'),
    list: path(ROOTS_DASHBOARD, '/subject/list'),
    edit: (sub) => path(ROOTS_DASHBOARD, `/subject/${sub}/edit`),
  },
  rooms: {
    root: path(ROOTS_DASHBOARD, '/rooms'),
    new: path(ROOTS_DASHBOARD, '/rooms/new'),
    list: path(ROOTS_DASHBOARD, '/rooms/list'),
    edit: (room) => path(ROOTS_DASHBOARD, `/rooms/${room}/edit`),
  },
  teachers: {
    root: path(ROOTS_DASHBOARD, '/teachers'),
    new: path(ROOTS_DASHBOARD, '/teachers/new'),
    list: path(ROOTS_DASHBOARD, '/teachers/list'),
    edit: (teacher) => path(ROOTS_DASHBOARD, `/teachers/${teacher}/edit`),
  },
  semester: {
    root: path(ROOTS_DASHBOARD, '/semester'),
    new: path(ROOTS_DASHBOARD, '/semester/new'),
    list: path(ROOTS_DASHBOARD, '/semester/list'),
    edit: (sem) => path(ROOTS_DASHBOARD, `/semester/${sem}/edit`),
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
