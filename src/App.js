import React from 'react';
import LoginPage from "./components/authentication/LoginPage";
import Notifications from 'react-notify-toast'
import {createStore} from 'redux'

function App() {
  return (
    <div className="App">
        <Notifications/>
     <LoginPage/>
    </div>
  );
}

export default App;
