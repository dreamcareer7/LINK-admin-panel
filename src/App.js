import React from 'react';
import Notifications from 'react-notify-toast';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from './components/authentication/login-page/LoginPage';
import VerificationPage from './components/authentication/verification-page/VerificationPage';
import ForgotPasswordPage from './components/authentication/forgotpassword-page/ForgotPasswordPage';
import SetNewPassword from './components/authentication/set-new-password/SetNewPassword';
import Dashboard from './components/dashboard/Dashboard';
import QuoteBank from './components/dashboard/quoteBank/QuoteBank';
import AddQuote from './components/dashboard/quoteBank/add-quote/AddQuote';
import ErrorMessages from './components/dashboard/settings/error-messages/ErrorMessages';
import Integrations from './components/dashboard/settings/integrations/Integrations';
import ManageAdmins from './components/dashboard/settings/manage-admins/ManageAdmins';
import Layout from './components/commonComponents/layout/Layout';
import Settings from './components/dashboard/settings/Settings';
import Subscribers from './components/dashboard/subscribers/Subscribers';
// import { getLogedInUser } from './redux/actions/authActions/AuthActions';

const PrivateRoute = ({ component, ...options }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getLogedInUser());
  // }, []);
  const finalComponent =
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0 ? (
      component
    ) : (
      <Redirect to="/login" />
    );

  return <Route {...options} component={finalComponent} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
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
            <Layout>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/subscribers" component={Subscribers} />
              <PrivateRoute exact path="/setting" component={Settings} />
              <PrivateRoute exact path="/error-message" component={ErrorMessages} />
              <PrivateRoute exact path="/integrations" component={Integrations} />
              <PrivateRoute exact path="/manage-admin" component={ManageAdmins} />
              <PrivateRoute
                exact
                path="/verificationPage"
                render={props => <VerificationPage {...props} />}
              />
              <PrivateRoute exact path="/quoteBank" render={props => <QuoteBank {...props} />} />
              <PrivateRoute exact path="/addQuote" render={props => <AddQuote {...props} />} />
            </Layout>
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default App;
