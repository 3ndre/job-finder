import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import DashboardLayoutUser from '../layouts/dashboarduser';
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

  const userData = JSON.parse(localStorage.getItem('user_data'));

  return useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home/>},
        { path: '/job/:id', element: <JobDetails/>},
        { path: '/job/:id/apply', element: <JobApply/>},
        { path: '/search', element: <JobSearch/>},
        { path: '/login', element: <Login/>},
        { path: '/register', element: <Register/>},
        { path: '/activate/:id/:token', element: <Activate/>},
        { path: '/location', element: <Location/>},
      ],
    },

    { path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    
    userData && userData.userData && (userData.userData.is_organization === true || userData.userData.is_staff === true) ?
    {
      path: '',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'settings', element: <AccountSettings /> },
        { path: 'job-board', element: <JobBoard /> },
        { path: 'org-board', element: <OrganizationBoard /> },
        { path: 'job-board/create', element: <JobBoardIndex /> },
        { path: 'org-board/create', element: <OrganizationBoardIndex /> },
        { path: 'job-board/update/:id', element: <JobBoardIndexUpdate /> },
        { path: 'org-board/update/:id', element: <OrganizationBoardIndexUpdate /> },
      ],
    }
    : userData && userData.userData && (userData.userData.is_organization === false || userData.userData.is_staff === false) ?
    {
      path: '',
      element: <DashboardLayoutUser />,
      children: [
        { path: 'dashboard', element: <DashboardUser /> },
        { path: 'settings', element: <AccountSettings /> },
        { path: 'cv', element: <CV /> },
      ],
    }
    :
    {
      path: '',
      element: <MainLayout />,
      children: [
        { path: 'dashboard', element: <LoadingPage /> },
        { path: 'settings', element: <LoadingPage /> },
        { path: 'cv', element: <LoadingPage /> },
        { path: 'job-board', element: <LoadingPage /> },
        { path: 'org-board', element: <LoadingPage /> },
        { path: 'job-board/create', element: <LoadingPage /> },
        { path: 'org-board/create', element: <LoadingPage /> },
        { path: 'job-board/update/:id', element: <LoadingPage /> },
        { path: 'org-board/update/:id', element: <LoadingPage /> },
      ],
    },
    
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}


// Dashboard
const Home = Loadable(lazy(() => import('../pages/Home')));
const JobDetails = Loadable(lazy(() => import('../pages/JobDetails')));
const JobApply = Loadable(lazy(() => import('../pages/jobdetails/JobApply')));
const JobSearch = Loadable(lazy(() => import('../pages/JobSearch')));
const Location = Loadable(lazy(() => import('../pages/Location')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const Activate = Loadable(lazy(() => import('../pages/auth/Activate')));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const JobBoard = Loadable(lazy(() => import('../pages/JobBoard')));
const OrganizationBoard = Loadable(lazy(() => import('../pages/OrganizationBoard')));
const JobBoardIndex = Loadable(lazy(() => import('../pages/job/forms/JobBoardIndex')));
const OrganizationBoardIndex = Loadable(lazy(() => import('../pages/user/forms/OrganizationBoardIndex')));
const JobBoardIndexUpdate = Loadable(lazy(() => import('../pages/job/forms/JobBoardIndexUpdate')));
const OrganizationBoardIndexUpdate = Loadable(lazy(() => import('../pages/user/forms/OrganizationBoardIndexUpdate')));
const AccountSettings = Loadable(lazy(() => import('../pages/AccountSettings')));
const CV = Loadable(lazy(() => import('../pages/dashboarduser/CV')));
const DashboardUser = Loadable(lazy(() => import('../pages/dashboarduser/DashboardUser')));
const LoadingPage = Loadable(lazy(() => import('../pages/LoadingPage')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
