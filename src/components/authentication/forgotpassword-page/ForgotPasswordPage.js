import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import user from '../../../assets/images/user.png';
import AuthTextInput from '../common/text-input/AuthTextInput';
import '../authStyle.scss';

import {
  checkForEmail,
  errorNotification,
  replaceHiddenCharacters,
} from '../../../constants/Toast';

function ForgotPasswordPage() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const verifyAndSendOtp = async () => {
    if (email.toString().trim().length === 0) errorNotification('Please enter userName');
    else if (!checkForEmail(replaceHiddenCharacters(email)))
      errorNotification('Please enter a valid userName');
    else {
      history.replace('/otpPage');
    }
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
            onChange={(e) => setEmail(e.target.value.toString().trim())}
          />
        </div>
        <button
          type="button"
          className="button success-button authButtonStyle"
          onClick={verifyAndSendOtp}
        >
          SEND OTP
        </button>
      </div>
    </div>
  );
}
export default ForgotPasswordPage;
