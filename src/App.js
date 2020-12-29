import React from 'react';
import Notifications from 'react-notify-toast';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/authentication/login-page/LoginPage';
import VerificationPage from './components/authentication/verification-page/VerificationPage';
import ForgotPasswordPage from './components/authentication/forgotpassword-page/ForgotPasswordPage';

function App() {
  /*  const PrivateRoute = ({ component, ...options }) => {
    const finalComponent =
      localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0
        ? component
        : LoginPage;

    return <Route {...options} component={finalComponent} />;
  }; */

  return (
    <div className="App">
      <Notifications />
      <Router>
        <Route>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={VerificationPage} />
            <Route exact path="/forgot" component={ForgotPasswordPage} />
            {/* <PrivateRoute exact path={"/"} render={props => <VerificationPage {...props} />}/> */}
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default App;
