import LoginPage from '../components/authentication/login-page/LoginPage';
import Settings from '../components/dashboard/settings/Settings';
import QuoteBank from '../components/dashboard/quoteBank/QuoteBank';
import Dashboard from '../components/dashboard/Dashboard';

const coreRoutes = [
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
    exact: true,
    title: 'Dashboard',
    component: Dashboard,
    routes: [
      {
        path: '/dashboard',
        title: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/settings',
        auth: true,
        title: 'Invoice',
        component: Settings,
      },
      {
        path: '/quoteBank',
        auth: true,
        title: 'Invoice',
        component: QuoteBank,
      },
    ],
  },
];

const routes = [...coreRoutes];
export default routes;
