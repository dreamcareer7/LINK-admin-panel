import React from 'react';
import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} title={rest.title} />} />
);

// PublicRoute.propTypes = {
//   component: PropTypes.element.isRequired,
// };

export default PublicRoute;
