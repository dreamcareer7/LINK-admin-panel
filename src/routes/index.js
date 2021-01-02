import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './Private';
import routes from './Routes';

const Routes = () => {
  return (
    <>
      <Router>
        <Suspense>
          <Switch>
            {routes.map(route => {
              console.log(route.auth);
              if (route.auth) {
                return <PrivateRoute {...route} />;
              }
              return false;
            })}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default Routes;
