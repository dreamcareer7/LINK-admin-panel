import React from 'react';
import LoginPage from "./components/authentication/LoginPage";
import Notifications from 'react-notify-toast';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import VerificationPage from "./components/authentication/VerificationPage";


function App() {
    const PrivateRoute = ({component, ...options}) => {
        const finalComponent = localStorage.getItem("userToken") !== null && localStorage.getItem("userToken").length !== 0 ? component : LoginPage;

        return <Route {...options} component={finalComponent}/>;
    };

  return (
    <div className="App">
        <Notifications/>
        <Router>
          <Route>
              <Switch>
                  <Route exact path={"/login"} component={LoginPage}/>
                  <Route exact path={"/"} component={VerificationPage}/>
                 {/* <PrivateRoute exact path={"/"} render={props => <VerificationPage {...props} />}/>*/}
              </Switch>
          </Route>
        </Router>
    </div>
  );
}

export default App;
