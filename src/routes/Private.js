import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// import LoginPage from '../components/authentication/login-page/LoginPage';

// const PrivateRoute = ({ component, ...options }) => {
//   console.log('options', component);
//   const finalComponent =
//     localStorage.getItem('userToken') !== null && localStorage.getItem('userToken').length !== 0
//       ? component
//       : LoginPage;

//   return <Route {...options} component={finalComponent} />;
// };

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('userToken') !== null &&
        localStorage.getItem('userToken').length !== 0 ? (
          <Component {...props} title={rest.title} routes={rest.routes} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;
