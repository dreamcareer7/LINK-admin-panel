import Dashboard from '../components/dashboard/Dashboard';
import LoginPage from '../components/authentication/login-page/LoginPage';
import Settings from '../components/dashboard/settings/Settings';

const CoreRoutes = [
  {
    path: '/login',
    exact: true,
    auth: false,
    // redirectIfAuth: true,
    title: 'Login',
    component: LoginPage,
  },
  {
    path: '/',
    auth: true,
    title: 'Dashboard',
    component: Dashboard,
    routes: [
      {
        auth: true,
        path: '/settings',
        title: 'Settings',
        component: Settings,
      },
    ],
  },
];

// const NoMatchRoute = {
//   path: '',
//   exact: true,
//   auth: false,
//   title: 'Lost in space',
//   component: PageNotFound,
// };

const routes = [...CoreRoutes];
export default routes;
