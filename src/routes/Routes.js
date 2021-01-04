import LoginPage from '../components/authentication/login-page/LoginPage';
import Settings from '../components/dashboard/settings/Settings';
import QuoteBank from '../components/dashboard/quoteBank/QuoteBank';
import Home from '../components/dashboard';
import Dashboard from '../components/dashboard/Dashboard';

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
    exact: true,
    title: 'Dashboard',
    component: Home,
    routes: [
      {
        path: '/dashboard',
        title: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/setting',
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
  // {
  //   path: '/setting',
  //   exact: true,
  //   auth: true,
  //   title: 'setting',
  //   component: Settings,
  // },
  // {
  //   path: '/quoteBank',
  //   exact: true,
  //   auth: true,
  //   title: 'Quote Bank',
  //   component: QuoteBank,
  // },
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
