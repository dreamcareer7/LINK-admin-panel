import React from 'react';
import Notifications from 'react-notify-toast';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from './components/authentication/login-page/LoginPage';
import VerificationPage from './components/authentication/verification-page/VerificationPage';
import ForgotPasswordPage from './components/authentication/forgotpassword-page/ForgotPasswordPage';
import SetNewPassword from './components/authentication/set-new-password/SetNewPassword';
import Dashboard from './components/dashboard/Dashboard';

const PrivateRoute = ({ component, ...options }) => {
  const finalComponent =
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0
      ? component
      : LoginPage;

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
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute
              exact
              path="/verificationPage"
              render={props => <VerificationPage {...props} />}
            />
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default App;
