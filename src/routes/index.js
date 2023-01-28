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
        { path: '/login', element: <Login/>},
        { path: '/register', element: <Register/>},
        { path: '/location', element: <Location/>},
      ],
    },
    
    {
      path: '',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <PageOne /> },
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
const Location = Loadable(lazy(() => import('../pages/Location')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
