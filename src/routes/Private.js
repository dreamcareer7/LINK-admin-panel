import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginPage from '../components/authentication/login-page/LoginPage';

const PrivateRoute = ({ component, ...options }) => {
  console.log('options', component);
  const finalComponent =
    localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0
      ? component
      : LoginPage;

  return <Route {...options} component={finalComponent} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;
