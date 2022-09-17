import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'department',
          children: [
            { element: <Navigate to="/dashboard/department/list" replace />, index: true },
            { path: 'list', element: <DeptList /> },
            { path: 'new', element: <DeptCreate /> },
            { path: ':dept/edit', element: <DeptCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'subject',
          children: [
            { element: <Navigate to="/dashboard/subject/list" replace />, index: true },
            { path: 'list', element: <SubjectList /> },
            { path: 'new', element: <SubjectCreate /> },
            { path: ':sub/edit', element: <SubjectCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'rooms',
          children: [
            { element: <Navigate to="/dashboard/rooms/list" replace />, index: true },
            { path: 'list', element: <RoomList /> },
            { path: 'new', element: <RoomCreate /> },
            { path: ':room/edit', element: <RoomCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'teachers',
          children: [
            { element: <Navigate to="/dashboard/teachers/list" replace />, index: true },
            { path: 'list', element: <TeachersList /> },
            { path: 'new', element: <TeachersCreate /> },
            { path: ':teacher/edit', element: <TeachersCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'semester',
          children: [
            { element: <Navigate to="/dashboard/semester/list" replace />, index: true },
            { path: 'list', element: <SemesterList /> },
            { path: 'new', element: <SemesterCreate /> },
            { path: ':sem/edit', element: <SemesterCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));

// USER
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// department
const DeptCreate = Loadable(lazy(() => import('../pages/dashboard/DeptCreate')));
const DeptList = Loadable(lazy(() => import('../pages/dashboard/DeptList')));

// subject
const SubjectCreate = Loadable(lazy(() => import('../pages/dashboard/SubjectCreate')));
const SubjectList = Loadable(lazy(() => import('../pages/dashboard/SubjectList')));

// subject
const RoomCreate = Loadable(lazy(() => import('../pages/dashboard/RoomCreate')));
const RoomList = Loadable(lazy(() => import('../pages/dashboard/RoomList')));

// teachers
const TeachersCreate = Loadable(lazy(() => import('../pages/dashboard/TeachersCreate')));
const TeachersList = Loadable(lazy(() => import('../pages/dashboard/TeachersList')));

// teachers
const SemesterCreate = Loadable(lazy(() => import('../pages/dashboard/SemesterCreate')));
const SemesterList = Loadable(lazy(() => import('../pages/dashboard/SemesterList')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
