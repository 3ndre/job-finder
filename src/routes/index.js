import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import MainLayout from '../layouts/main'
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
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
      path: '',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home/>},
        { path: '/job/:id', element: <JobDetails/>},
        { path: '/login', element: <Login/>},
        { path: '/register', element: <Register/>},
        { path: '/activate/:id/:token', element: <Activate/>},
        { path: '/location', element: <Location/>},
      ],
    },
    
    {
      path: '',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'job-board', element: <JobBoard /> },
        { path: 'user-board', element: <UserBoard /> },
        { path: 'job-board/create', element: <JobBoardIndex /> },
        { path: 'user-board/create', element: <UserBoardIndex /> },
        { path: 'job-board/update/:id', element: <JobBoardIndexUpdate /> },
        { path: 'user-board/update/:id', element: <UserBoardIndexUpdate /> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}


// Dashboard
const Home = Loadable(lazy(() => import('../pages/Home')));
const JobDetails = Loadable(lazy(() => import('../pages/JobDetails')));
const Location = Loadable(lazy(() => import('../pages/Location')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const Activate = Loadable(lazy(() => import('../pages/auth/Activate')));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const JobBoard = Loadable(lazy(() => import('../pages/JobBoard')));
const UserBoard = Loadable(lazy(() => import('../pages/UserBoard')));
const JobBoardIndex = Loadable(lazy(() => import('../pages/job/forms/JobBoardIndex')));
const UserBoardIndex = Loadable(lazy(() => import('../pages/user/forms/UserBoardIndex')));
const JobBoardIndexUpdate = Loadable(lazy(() => import('../pages/job/forms/JobBoardIndexUpdate')));
const UserBoardIndexUpdate = Loadable(lazy(() => import('../pages/user/forms/UserBoardIndexUpdate')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
