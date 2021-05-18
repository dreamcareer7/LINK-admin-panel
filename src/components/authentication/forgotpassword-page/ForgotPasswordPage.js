import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import user from '../../../assets/images/login-user.svg';
import AuthTextInput from '../common/text-input/AuthTextInput';
import '../authStyle.scss';

import {
  checkForEmail,
  errorNotification,
  replaceHiddenCharacters,
  successNotification,
} from '../../../constants/Toast';
import AuthService from '../../../services/auth-services/AuthSevices';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const sendResetLink = () => {
    if (email.toString().trim().length === 0) errorNotification('Please enter username');
    else if (!checkForEmail(replaceHiddenCharacters(email)))
      errorNotification('Please enter a valid username');
    else {
      AuthService.forgotPassword(email)
        .then(response => {
          if (response.data.status === 'SUCCESS') {
            successNotification('Reset link has been sent to your email address');
          }
        })
        .catch(e => {
          if (e.response.data.status === undefined) {
            errorNotification('It seems like server is down, Please try after sometime');
          } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
            errorNotification('Internal server error');
          } else if (e.response.data.status === 'NOT_FOUND') {
            errorNotification('User not found');
          }
        });
    }
  };
  const backToLogin = () => {
    history.goBack();
  };
  return (
    <div>
      <div className="content-container">
        <img alt="linkfluencer" src={linkFluencer} className="logo" />
        <div className="form">
          <AuthTextInput
            src={user}
            type="text"
            placeholder="Enter Username"
            value={email}
            class="login-email"
            onKeyPress={sendResetLink}
            onChange={e => setEmail(e.target.value.toString().trim())}
            onFocus={(e) => {e.target.placeholder = ""}}
            onBlur={(e) => {e.target.placeholder = "Enter Username"}}
          />
        </div>

        <button
          type="button"
          className="button success-button authButtonStyle"
          onClick={sendResetLink}
        >
          Send Reset Link
        </button>
        <button type="button" className="button primary-button" onClick={backToLogin}>
          Back To Login
        </button>
      </div>
    </div>
  );
}
