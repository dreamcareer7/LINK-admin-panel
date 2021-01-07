import React from 'react';
import Notifications from 'react-notify-toast';
import {Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from './components/authentication/login-page/LoginPage';
import VerificationPage from './components/authentication/verification-page/VerificationPage';
import ForgotPasswordPage from './components/authentication/forgotpassword-page/ForgotPasswordPage';
import SetNewPassword from './components/authentication/set-new-password/SetNewPassword';
import Dashboard from './components/dashboard/Dashboard';
import AddQuote from './components/dashboard/quoteBank/add-edit-quote/AddQuote';
import ErrorMessages from './components/dashboard/settings/error-messages/ErrorMessages';
import Integrations from './components/dashboard/settings/integrations/Integrations';

import Layout from './components/commonComponents/layout/Layout';
import Settings from './components/dashboard/settings/Settings';
import Subscribers from './components/dashboard/subscribers/Subscribers';
import QuoteBank from './components/dashboard/quoteBank/QuoteBank';
import EditAdmin from './components/dashboard/settings/manage-admins/EditAdmin/EditAdmin';

const PrivateRoute = ({ component, ...options }) => {
  const isLoggedIn = localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0
  const finalComponent =
      isLoggedIn
      ? component
      : LoginPage;
  if(options.path === '/' && isLoggedIn){return <Route {...options} > <Redirect to='/dashboard'/></Route>}
  return <Route {...options} component={finalComponent} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
PrivateRoute.defaultProps = {
  component: null,
};

function App() {
  return (
    <div className="App">
      <Notifications />
      <Router>
          <Route>
            <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/forgot" component={ForgotPasswordPage} />
            <Route exact path="/authAdmin/reset-password/:token" component={SetNewPassword} />
            <PrivateRoute exact path="/verificationPage" component={VerificationPage} />
            <Layout>
              <PrivateRoute exact path="/"/>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/subscribers" component={Subscribers} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <PrivateRoute exact path="/error-message" component={ErrorMessages} />
              <PrivateRoute exact path="/integrations" component={Integrations} />
              <PrivateRoute exact path="/manage-admin" component={EditAdmin} />
              <PrivateRoute exact path="/quoteBank" component={QuoteBank} />
              <PrivateRoute exact path="/quote" component={AddQuote} />
              <PrivateRoute exact path="/quote/:id" component={AddQuote} />
            </Layout>
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default App;
