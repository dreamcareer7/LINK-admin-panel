import React from 'react';
import linkfluencer from '../../images/linkfluencer.png';
import user from '../../images/user.png';
import padlock from '../../images/padlock.png';
import hideInterface from '../../images/hide-interface-symbol.png'

function LoginPage() {
    return (
        <div className="login-content-container">
            <img alt="linkfluencer" src={linkfluencer} class="logo"/>
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

                <button className="button success-button login-button">LOGIN</button>
                <a href="" className="forgot-password">Forgot Password?</a>

            </div>
        </div>
    );
}

export default LoginPage;
