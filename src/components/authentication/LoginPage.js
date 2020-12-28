import React, {useState} from 'react';
import linkFluencer from '../../assets/images/linkfluencer.png';
import user from '../../assets/images/user.png';
import padlock from '../../assets/images/padlock.png';
import hideInterface from '../../assets/images/hide-interface-symbol.png'

function LoginPage() {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    function onClickLoginButton(emailAddress, password) {

    }
    return (
        <div className="login-content-container">
            <img alt="linkfluencer" src={linkFluencer} className="logo"/>
            <div className="login-form">

                <div className="login-form--detail-container">
                    <div className="detail-icon">
                        <img alt="user" src={user}/>
                    </div>
                    <input type="text" placeholder="Enter Username"/>
                </div>

                <div className="login-form--detail-container">
                    <div className="detail-icon">
                        <img alt="password" src={padlock}/>
                    </div>
                    <input type="password" placeholder="Enter Password"/>
                    <img alt="hide-pswrd" className="show-hide-pswrd" src={hideInterface}/>
                </div>

                <button className="button success-button login-button"
                        variant="contained" onClick={() => onClickLoginButton(emailAddress, password)}
                >LOGIN</button>
                <a href="" className="forgot-password">Forgot Password?</a>

            </div>
        </div>
    );
}

export default LoginPage;
