import React from 'react';
import { useSelector } from 'react-redux';
import Notifications from 'react-notify-toast';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from './components/authentication/login-page/LoginPage';
import VerificationPage from './components/authentication/verification-page/VerificationPage';
import ForgotPasswordPage from './components/authentication/forgotpassword-page/ForgotPasswordPage';
import SetNewPassword from './components/authentication/set-new-password/SetNewPassword';
import Dashboard from './components/dashboard/dashboard/Dashboard';
import AddQuote from './components/dashboard/quoteBank/add-edit-quote/AddQuote';
import Integrations from './components/dashboard/settings/integrations/Integrations';

import Layout from './components/commonComponents/layout/Layout';
import Settings from './components/dashboard/settings/Settings';
// import Subscribers from './components/dashboard/subscribers/Subscribers';
import QuoteBank from './components/dashboard/quoteBank/QuoteBank';
import EditAdmin from './components/dashboard/settings/manage-admins/EditAdmin/EditAdmin';
import AddInvited from './components/dashboard/subscribers/AddInvited/AddInvited';
import AddSubscribers from './components/dashboard/subscribers/EditSubscribers/EditSubscribers';
import SubscribersControllerRootComponent from './components/dashboard/subscribers/SubscribersControllerRootComponent';
import LinkLoader from './components/commonComponents/Loader/LinkLoader';
import SetPassword from './components/authentication/set-password/SetPassword';

const PrivateRoute = ({ component, ...options }) => {
  const isLoggedIn =
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0;
  // const userDetail = useSelector(state => state.loggedUser);
  //  const isLoggedIn = userDetail ? userDetail.token : false;
  const finalComponent = isLoggedIn ? component : LoginPage;
  if (options.path === '/' && isLoggedIn) {
    return (
      <Route {...options}>
        <Redirect to="/dashboard" />
      </Route>
    );
  }
  return <Route {...options} component={finalComponent} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
PrivateRoute.defaultProps = {
  component: null,
};

function App() {
  // console.log('props=>', loader.defaultValue);

  const isLoadingApp = useSelector(state => state.apiLoader);
  return (
    <div className="App">
      <Notifications />
      {isLoadingApp && <LinkLoader />}
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgot" component={ForgotPasswordPage} />
          <Route exact path="/authAdmin/reset-password/:token" component={SetNewPassword} />
          <Route exact path="/authAdmin/set-password/:token" component={SetPassword} />
          <PrivateRoute exact path="/verificationPage" component={VerificationPage} />
          <Layout>
            <PrivateRoute exact path="/" />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/subscribers">
              <Redirect to="/subscribers/subscribed" />
            </PrivateRoute>
            <PrivateRoute
              exact
              path="/subscribers/:type"
              component={SubscribersControllerRootComponent}
            />
            <PrivateRoute exact path="/subscribers/subscribed/:subId" component={AddSubscribers} />
            <PrivateRoute exact path="/subscribers/invited/:userId" component={AddInvited} />
            <PrivateRoute exact path="/settings">
              <Redirect to="/settings/errormessages" />
            </PrivateRoute>
            <PrivateRoute exact path="/settings/:type" component={Settings} />
            <PrivateRoute exact path="/settings/manageadmin/:userId" component={EditAdmin} />
            <PrivateRoute exact path="/integrations" component={Integrations} />
            <PrivateRoute exact path="/quotebank" component={QuoteBank} />
            <PrivateRoute exact path="/quote" component={AddQuote} />
            <PrivateRoute exact path="/quote/:id" component={AddQuote} />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
