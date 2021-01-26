import React, {Suspense} from 'react';
import Notifications from 'react-notify-toast';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
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
import Subscriber from "./components/dashboard/subscribers/subscriber";

const PrivateRoute = ({ component, ...options }) => {
  const isLoggedIn =
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0;
  const finalComponent = isLoggedIn ? component : LoginPage;
  if (options.path === '/' && isLoggedIn) {
    return (
      <Route {...options}>
        {' '}
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
  const loader = useSelector(state => state.loadingBar);
  // console.log('props=>', loader.defaultValue);
  return (
    <div className="App">
      <Notifications />

      <Router>
        <Suspense>
          {Boolean(loader) && <div className="loader ajax-global-spin" />}

          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/forgot" component={ForgotPasswordPage} />
            <Route exact path="/authAdmin/reset-password/:token" component={SetNewPassword} />
            <PrivateRoute exact path="/verificationPage" component={VerificationPage} />
            <Layout>
              <PrivateRoute exact path="/" />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/subscribers/:type" component={Subscriber} />
              <PrivateRoute
                exact
                path="/subscribers/subscribed/:subId"
                component={AddSubscribers}
              />
              <PrivateRoute exact path="/subscribers/invited/addInvited" component={AddInvited} />
              <PrivateRoute exact path="/settings/:type" component={Settings} />
              <PrivateRoute exact path="/settings/manageAdmin/:userId" component={EditAdmin} />
              <PrivateRoute exact path="/integrations" component={Integrations} />
              <PrivateRoute exact path="/quoteBank" component={QuoteBank} />
              <PrivateRoute exact path="/quote" component={AddQuote} />
              <PrivateRoute exact path="/quote/:id" component={AddQuote} />
            </Layout>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loadingBar: state.loadingBar,
  };
};

export default connect(mapStateToProps)(App);
