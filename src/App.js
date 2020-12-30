import React from 'react';
import LoginPage from "./components/authentication/LoginPage";
import Dashboard from "./components/dashboard/dashboard";
import {createStore} from 'redux'
import Trinity from "./components/dashboard/trinity/trinity";
import Settings from "./components/dashboard/settings/settings";

function App() {
  return (
    <div className="App">
     <Dashboard/>
    </div>
  );
}

export default App;
