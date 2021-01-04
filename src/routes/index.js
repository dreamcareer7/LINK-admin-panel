import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import routes from './Routes';

const Routes = () => {
  return (
    <>
      <Router>
        <Suspense>
          <Switch>
            {routes.map((route, i) => {
              console.log('route', route);
              if (route.auth) {
                console.log('isPrivate');
                // eslint-disable-next-line react/no-array-index-key
                return <PrivateRoute key={i} {...route} />;
              }
              // eslint-disable-next-line react/no-array-index-key
              return <PublicRoute key={i} {...route} />;
            })}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default Routes;
