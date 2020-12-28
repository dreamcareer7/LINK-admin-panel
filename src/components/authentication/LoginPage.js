import React, {useState} from 'react';
import linkFluencer from '../../assets/images/linkfluencer.png';
import user from '../../assets/images/user.png';
import padlock from '../../assets/images/padlock.png';
import hideInterface from '../../assets/images/hide-interface-symbol.png'
import {errorNotification, successNotification} from "../../constants/Toast";

function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onClickLoginButton = (userName, password) => {
        if (userName.toString().trim().length === 0)
            errorNotification("Please enter user name");
        else if (password.toString().trim().length === 0)
            errorNotification("Please enter password");
        else {
            successNotification("You are logged in successfully")
        }

    }

    return (
        <div className="login-content-container">
            <img alt="linkfluencer" src={linkFluencer} className="logo"/>
            <div className="login-form">

                <div className="login-form--detail-container">
                    <div className="detail-icon">
                        <img alt="user" src={user}/>
                    </div>
                    <input type="text"
                           placeholder="Enter Username"
                           value={userName}
                           onChange={e => setUserName(e.target.value.toString().trim())}
                    />
                </div>

                <div className="login-form--detail-container">
                    <div className="detail-icon">
                        <img alt="password" src={padlock}/>
                    </div>
                    <input type="password"
                           placeholder="Enter Password"
                           value={password}
                           onChange={e => setPassword(e.target.value.toString().trim())}
                    />
                    <img alt="hide-pswrd" className="show-hide-pswrd" src={hideInterface}/>
                </div>

                <button className="button success-button login-button"
                        onClick={() => onClickLoginButton(userName, password)}>
                    LOGIN
                </button>
                <a href="" className="forgot-password">Forgot Password?</a>

            </div>
        </div>
    );
}

export default LoginPage;
